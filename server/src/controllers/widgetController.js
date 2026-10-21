const db = require('../db');

const getWidgets = (req, res) => {
  const store = db.getStore();
  res.json({ success: true, count: store.widgets.length, widgets: store.widgets });
};

const createWidget = (req, res) => {
  const store = db.getStore();
  const { name, type, theme, borderRadius, showVerifiedBadge, showCustomerName } = req.body;

  const newWid = {
    id: `WID-${100 + store.widgets.length + 1}`,
    businessId: store.business.id,
    name: name || "New Widget",
    type: type || "Review Carousel",
    theme: theme || "Light",
    borderRadius: Number(borderRadius) || 8,
    showVerifiedBadge: showVerifiedBadge !== undefined ? Boolean(showVerifiedBadge) : true,
    showCustomerName: showCustomerName !== undefined ? Boolean(showCustomerName) : true,
    embedCode: `<script src="http://localhost:5000/widget.js"></script>\n<div data-reviewsphere-widget="${type ? type.toLowerCase().replace(/\s+/g, '-') : 'carousel'}" data-business-id="${store.business.id}"></div>`
  };

  store.widgets.unshift(newWid);
  db.saveStore();
  res.json({ success: true, widget: newWid });
};

const getPublicBusinessReviews = (req, res) => {
  const { id } = req.params;
  const store = db.getStore();

  const business = store.business;
  const reviews = store.reviews.filter(r => r.status === "Published");

  res.json({
    success: true,
    business: {
      id: business.id,
      name: business.name,
      rating: business.rating,
      totalReviews: business.totalReviews,
      verifiedCount: business.verifiedCount,
      positiveSentimentPct: business.positiveSentimentPct,
      logo: business.logo,
      category: business.category,
      website: business.website,
      description: business.description
    },
    reviews: reviews.slice(0, 20)
  });
};

const getPublicProductReviews = (req, res) => {
  const { id } = req.params;
  const store = db.getStore();

  const product = store.products.find(p => p.id === id);
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });

  const reviews = store.reviews.filter(r => r.productId === id && r.status === "Published");

  res.json({
    success: true,
    product,
    reviews
  });
};

module.exports = { getWidgets, createWidget, getPublicBusinessReviews, getPublicProductReviews };
