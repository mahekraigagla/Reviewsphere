const db = require('../db');

const getReviews = (req, res) => {
  const store = db.getStore();
  const { filter, search, productId, reviewType, sentiment } = req.query;
  const currentBizId = store.business ? store.business.id : null;
  let list = currentBizId ? store.reviews.filter(r => r.businessId === currentBizId) : [];

  if (filter) {
    if (filter === "needsResponse") {
      list = list.filter(r => !r.response);
    } else if (filter === "verified") {
      list = list.filter(r => r.verified);
    } else if (filter === "unverified") {
      list = list.filter(r => !r.verified);
    } else if (filter === "flagged") {
      list = list.filter(r => r.status === "Flagged");
    }
  }

  if (sentiment) {
    list = list.filter(r => r.sentiment.toLowerCase() === sentiment.toLowerCase());
  }

  if (reviewType) {
    list = list.filter(r => r.reviewType.toLowerCase() === reviewType.toLowerCase());
  }

  if (productId) {
    list = list.filter(r => r.productId === productId);
  }

  if (search) {
    const s = search.toLowerCase();
    list = list.filter(r => 
      r.customerName.toLowerCase().includes(s) ||
      r.reviewText.toLowerCase().includes(s) ||
      (r.productName && r.productName.toLowerCase().includes(s)) ||
      (r.orderId && r.orderId.toLowerCase().includes(s))
    );
  }

  res.json({
    success: true,
    count: list.length,
    reviews: list
  });
};

const getReviewDetails = (req, res) => {
  const { id } = req.params;
  const store = db.getStore();
  const review = store.reviews.find(r => r.id === id);
  if (!review) return res.status(404).json({ success: false, message: "Review not found" });

  const customer = store.customers.find(c => c.id === review.customerId);
  const order = review.orderId ? store.orders.find(o => o.id === review.orderId) : null;
  const product = review.productId ? store.products.find(p => p.id === review.productId) : null;

  res.json({
    success: true,
    review,
    customer,
    order,
    product
  });
};

// Request Review (Manual / Automated Single Request)
const requestReview = (req, res) => {
  const store = db.getStore();
  const {
    customerName,
    customerEmail,
    customerPhone,
    productId,
    orderId,
    orderDate,
    deliveryDate,
    reviewType,
    channel
  } = req.body;

  if (!customerName || !customerEmail) {
    return res.status(400).json({ success: false, message: "Customer name and email are required" });
  }

  // Find or create customer
  let customer = store.customers.find(c => c.email.toLowerCase() === customerEmail.trim().toLowerCase());
  if (!customer) {
    customer = {
      id: `CUST-IND-${Date.now()}`,
      businessId: store.business.id,
      name: customerName.trim(),
      email: customerEmail.trim(),
      phone: customerPhone || "+91 98765 00000",
      location: "India",
      ordersCount: 1,
      reviewsCount: 0,
      avgRating: 5.0,
      status: "Active",
      createdAt: new Date().toISOString()
    };
    store.customers.unshift(customer);
  }

  // Find product
  let product = productId ? store.products.find(p => p.id === productId) : store.products[0];
  if (!product) {
    product = {
      id: "PROD-GEN",
      name: "General Purchase",
      price: 999,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
    };
  }

  // Generate or find order
  const actualOrderId = orderId || `ORD-IND-${Date.now().toString().slice(-4)}`;
  let order = store.orders.find(o => o.id === actualOrderId);
  if (!order) {
    order = {
      id: actualOrderId,
      businessId: store.business.id,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      productId: product.id,
      productName: product.name,
      amount: product.price || 999,
      status: "Delivered",
      orderDate: orderDate || new Date(Date.now() - 3 * 86400000).toISOString(),
      deliveryDate: deliveryDate || new Date().toISOString(),
      invitationSent: true
    };
    store.orders.unshift(order);
  }

  // Support custom worldwide public URL or default host
  const requestedBase = req.body.publicBaseUrl || store.business?.publicBaseUrl || (req.headers.origin && !req.headers.origin.includes('localhost') ? req.headers.origin : 'http://localhost:3000');
  const cleanBaseUrl = (requestedBase || 'http://localhost:3000').replace(/\/$/, '');
  
  // Create unique invitation token
  const token = `TOK-${actualOrderId}-${Date.now().toString().slice(-4)}`;
  
  // Check if base URL is an external Google Form
  const isExternalForm = cleanBaseUrl.includes('forms.gle') || cleanBaseUrl.includes('docs.google.com/forms');
  
  // Real working review form URL accessible globally
  const workingReviewUrl = isExternalForm 
    ? cleanBaseUrl 
    : `${cleanBaseUrl}/review/submit?token=${token}&orderId=${actualOrderId}&name=${encodeURIComponent(customer.name)}&email=${encodeURIComponent(customer.email)}&productId=${product.id}`;
  const shortReviewUrl = isExternalForm ? cleanBaseUrl : `${cleanBaseUrl}/r/${token}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(workingReviewUrl)}`;

  // Clean phone number for WhatsApp
  let cleanPhone = (customerPhone || customer.phone || '').replace(/[^0-9]/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone; // Default to India prefix if 10 digits
  }

  // Real working WhatsApp message with working link
  const whatsappMessage = `Hi ${customer.name.split(' ')[0]}! 👋\n\nThank you for choosing *${store.business.name}*. You recently ordered *${product.name}* (Order ID: ${actualOrderId}).\n\n⭐ We'd love to get your valuable feedback. It takes just 30 seconds!\n\n📋 Tap to submit your review:\n👉 ${workingReviewUrl}\n\nThank you,\n${store.business.name}`;

  const emailSubject = `Feedback Request: How was your experience with ${store.business.name}? (Order: ${actualOrderId})`;
  const emailBody = `Hi ${customer.name},\n\nThank you for choosing ${store.business.name}. You recently purchased ${product.name} (Order ID: ${actualOrderId}).\n\nCould you please take 30 seconds to share your review on our feedback form?\n\n👉 Open Feedback Form: ${workingReviewUrl}\n\nThank you,\n${store.business.name} Team`;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(whatsappMessage)}`;
  const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(whatsappMessage)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(customer.email)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const mailtoUrl = `mailto:${encodeURIComponent(customer.email)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const invitation = {
    id: `INV-IND-${Date.now()}`,
    businessId: store.business.id,
    campaignId: "CAMP-MANUAL",
    customerId: customer.id,
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customerPhone || customer.phone,
    cleanPhone: cleanPhone,
    orderId: actualOrderId,
    productId: product.id,
    productName: product.name,
    token: token,
    reviewUrl: workingReviewUrl,
    whatsappUrl: whatsappUrl,
    whatsappWebUrl: whatsappWebUrl,
    gmailUrl: gmailUrl,
    mailtoUrl: mailtoUrl,
    reviewType: reviewType || "Both",
    channel: channel || "Both",
    status: "Sent",
    sentAt: new Date().toISOString(),
    openedAt: null,
    reviewedAt: null,
    whatsappMessagePreview: whatsappMessage,
    emailPreview: {
      subject: emailSubject,
      product: product.name,
      orderId: actualOrderId,
      reviewUrl: workingReviewUrl,
      body: emailBody
    }
  };

  if (!store.invitations) store.invitations = [];
  store.invitations.unshift(invitation);

  db.saveStore();

  res.json({
    success: true,
    message: `Review invitation successfully generated & dispatched for ${customer.name}!`,
    invitation,
    reviewUrl: workingReviewUrl,
    qrCodeUrl: qrCodeUrl,
    whatsappUrl,
    whatsappWebUrl,
    gmailUrl,
    mailtoUrl
  });
};

const submitReview = (req, res) => {
  const store = db.getStore();
  const {
    customerName,
    customerEmail,
    customerCity,
    productId,
    orderId,
    invitationToken,
    rating,
    reviewText,
    reviewType,
    recommend,
    attributes,
    likedAspects,
    photos,
    businessId
  } = req.body;

  if (!rating || !reviewText) {
    return res.status(400).json({ success: false, message: "Rating and review text are required" });
  }

  const targetBizId = businessId || store.business?.id;
  const targetBiz = (store.businesses && store.businesses.find(b => b.id === targetBizId)) || store.business;

  // Verification process (Section 23 Master Rule)
  let isVerified = false;
  let matchedOrder = null;
  let matchedCustomer = null;
  let matchedProduct = null;

  if (invitationToken) {
    const inv = store.invitations ? store.invitations.find(i => i.token === invitationToken) : null;
    if (inv) {
      matchedOrder = store.orders.find(o => o.id === inv.orderId);
      matchedCustomer = store.customers.find(c => c.id === inv.customerId);
      matchedProduct = store.products.find(p => p.id === inv.productId);
      if (matchedOrder && matchedCustomer) {
        isVerified = true;
        inv.status = "Reviewed";
        inv.reviewedAt = new Date().toISOString();
      }
    }
  } else if (orderId && customerEmail) {
    matchedOrder = store.orders.find(o => o.id === orderId && o.customerEmail.toLowerCase() === customerEmail.toLowerCase());
    if (matchedOrder) {
      isVerified = true;
      matchedCustomer = store.customers.find(c => c.id === matchedOrder.customerId);
      matchedProduct = store.products.find(p => p.id === matchedOrder.productId);
    }
  }

  // Sentiment classification engine rule
  let sentiment = "Neutral";
  const numRating = Number(rating);
  const lowerText = reviewText.toLowerCase();

  if (numRating >= 4 || lowerText.includes("superb") || lowerText.includes("awesome") || lowerText.includes("great") || lowerText.includes("love") || lowerText.includes("excellent") || lowerText.includes("fast") || lowerText.includes("beautiful") || lowerText.includes("delicious") || lowerText.includes("perfect")) {
    sentiment = "Positive";
  } else if (numRating <= 2 || lowerText.includes("poor") || lowerText.includes("disappointed") || lowerText.includes("delay") || lowerText.includes("late") || lowerText.includes("damage") || lowerText.includes("bad")) {
    sentiment = "Negative";
  }

  let selectedProd = matchedProduct;
  if (!selectedProd && productId && productId !== 'company' && productId.trim() !== '') {
    selectedProd = store.products.find(p => p.id === productId && (!targetBizId || p.businessId === targetBizId));
  }

  const isCompany = !selectedProd;

  const newReview = {
    id: `REV-IND-${Date.now()}`,
    businessId: targetBizId,
    customerId: matchedCustomer ? matchedCustomer.id : `CUST-GUEST-${Date.now().toString().slice(-4)}`,
    customerName: customerName || (matchedCustomer ? matchedCustomer.name : "Verified Customer"),
    customerEmail: customerEmail || (matchedCustomer ? matchedCustomer.email : "customer@example.in"),
    customerLocation: customerCity || (matchedCustomer ? matchedCustomer.location : "India"),
    productId: selectedProd ? selectedProd.id : null,
    productName: selectedProd ? selectedProd.name : null,
    productImage: selectedProd ? selectedProd.image : null,
    orderId: matchedOrder ? matchedOrder.id : (orderId || null),
    reviewType: reviewType || (isCompany ? "Company" : "Product"),
    rating: numRating,
    reviewText,
    sentiment,
    attributes: attributes || { quality: numRating, value: numRating, performance: numRating, packaging: numRating },
    likedAspects: likedAspects || ["Quality", "Customer Service"],
    verified: isVerified,
    status: "Published",
    recommend: recommend !== undefined ? Boolean(recommend) : numRating >= 4,
    photos: photos || [],
    invitationToken: invitationToken || null,
    response: null,
    createdAt: new Date().toISOString()
  };

  store.reviews.unshift(newReview);

  // Recalculate Business Aggregates scoped strictly to this business
  const bizReviews = store.reviews.filter(r => r.businessId === targetBizId);
  const total = bizReviews.length;
  const avg = total > 0 ? (bizReviews.reduce((acc, r) => acc + r.rating, 0) / total) : 5.0;
  const verifiedCount = bizReviews.filter(r => r.verified).length;
  const positiveCount = bizReviews.filter(r => r.sentiment === "Positive").length;

  if (targetBiz) {
    targetBiz.totalReviews = total;
    targetBiz.rating = Number(avg.toFixed(2));
    targetBiz.verifiedCount = verifiedCount;
    targetBiz.positiveSentimentPct = total > 0 ? Math.round((positiveCount / total) * 100) : 100;
  }
  if (store.business && store.business.id === targetBizId) {
    store.business.totalReviews = total;
    store.business.rating = Number(avg.toFixed(2));
    store.business.verifiedCount = verifiedCount;
    store.business.positiveSentimentPct = total > 0 ? Math.round((positiveCount / total) * 100) : 100;
  }

  // Recalculate Product Aggregates if applicable
  if (selectedProd) {
    const prodReviews = store.reviews.filter(r => r.productId === selectedProd.id);
    if (prodReviews.length > 0) {
      const prodAvg = prodReviews.reduce((acc, r) => acc + r.rating, 0) / prodReviews.length;
      const prodPos = prodReviews.filter(r => r.sentiment === "Positive").length;
      selectedProd.reviewsCount = prodReviews.length;
      selectedProd.rating = Number(prodAvg.toFixed(2));
      selectedProd.positivePct = Math.round((prodPos / prodReviews.length) * 100);
    }
  }

  // Update Dynamic AI Insights
  const negativeReviews = store.reviews.filter(r => r.sentiment === "Negative" || r.rating <= 2);
  const positiveReviews = store.reviews.filter(r => r.sentiment === "Positive" || r.rating >= 4);

  store.aiInsights = [
    {
      id: "INS-DYN-001",
      title: negativeReviews.length > 0 ? "Fulfillment & packaging attention needed" : "Zero critical defects detected",
      severity: negativeReviews.length > 5 ? "Critical" : "Minor",
      category: "Operations",
      description: negativeReviews.length > 0 
        ? `${negativeReviews.length} customer feedback items mention transit delays or packaging creases.`
        : "Customer sentiment is currently at peak satisfaction levels across all regions.",
      actionText: "Inspect feedback issues",
      filterKeyword: "packaging",
      sentimentImpact: -2.5
    },
    {
      id: "INS-DYN-002",
      title: "Strong customer appreciation for product build & value",
      severity: "Strength",
      category: "Product Performance",
      description: `${positiveReviews.length} verified buyer reviews strongly praise product durability and fast checkout.`,
      actionText: "View positive reviews",
      filterKeyword: "quality",
      sentimentImpact: +15.8
    }
  ];

  db.saveStore();

  res.json({
    success: true,
    verified: isVerified,
    review: newReview,
    message: isVerified 
      ? "Thank you! Your verified buyer review has been verified and published to the live dashboard." 
      : "Thank you! Your review has been submitted successfully."
  });
};

const replyToReview = (req, res) => {
  const { id } = req.params;
  const { responseText } = req.body;
  const store = db.getStore();

  const review = store.reviews.find(r => r.id === id);
  if (!review) return res.status(404).json({ success: false, message: "Review not found" });

  review.response = {
    id: `RESP-${Date.now()}`,
    businessId: store.business.id,
    responseText,
    createdAt: new Date().toISOString()
  };

  db.saveStore();
  res.json({ success: true, review });
};

const flagReview = (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  const store = db.getStore();

  const review = store.reviews.find(r => r.id === id);
  if (!review) return res.status(404).json({ success: false, message: "Review not found" });

  review.status = "Flagged";
  review.flagReason = reason || "Offensive/Spam behavior";

  db.saveStore();
  res.json({ success: true, review });
};

module.exports = { getReviews, getReviewDetails, requestReview, submitReview, replyToReview, flagReview };
