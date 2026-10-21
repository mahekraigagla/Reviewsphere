const db = require('../db');
const { generateCategoryBusinessData } = require('../seed/seedData');

const register = (req, res) => {
  const { businessName, fullName, email, password, website, businessCategory, logo } = req.body;
  const store = db.getStore();

  if (!email || !password || !businessName) {
    return res.status(400).json({ success: false, message: "Business name, email and password are required" });
  }

  if (!store.users) store.users = [];
  const existingUser = store.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

  if (existingUser) {
    return res.status(400).json({ success: false, message: "An account already exists with this email. Please sign in." });
  }

  const businessId = `BUS-IND-${Date.now()}`;
  
  // Category default logo/images
  let defaultLogo = logo;
  const catLower = (businessCategory || '').toLowerCase();
  if (!defaultLogo) {
    if (catLower.includes("food") || catLower.includes("dining") || catLower.includes("restaurant")) {
      defaultLogo = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=80";
    } else if (catLower.includes("fashion") || catLower.includes("apparel") || catLower.includes("clothing")) {
      defaultLogo = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&auto=format&fit=crop&q=80";
    } else if (catLower.includes("electronics") || catLower.includes("tech")) {
      defaultLogo = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80";
    } else if (catLower.includes("health") || catLower.includes("ayurveda")) {
      defaultLogo = "https://images.unsplash.com/photo-1608248597359-009e86c071d7?w=150&auto=format&fit=crop&q=80";
    } else {
      defaultLogo = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&auto=format&fit=crop&q=80";
    }
  }

  const newBusiness = {
    id: businessId,
    name: businessName.trim(),
    website: website || "https://mybusiness.in",
    category: businessCategory || "Fashion & Apparel India",
    logo: defaultLogo,
    description: `${businessName.trim()} - Premium verified enterprise catalog on ReviewSphere.`,
    location: "India",
    rating: 5.0,
    totalReviews: 0,
    verifiedCount: 0,
    nps: 100,
    positiveSentimentPct: 100,
    responseRatePct: 100
  };

  if (!store.businesses) {
    store.businesses = store.business ? [store.business] : [];
  }
  store.businesses.push(newBusiness);
  store.business = newBusiness;

  // New business starts with clean catalog - only products they add will be displayed!
  if (!store.products) store.products = [];
  if (!store.reviews) store.reviews = [];
  if (!store.customers) store.customers = [];
  if (!store.orders) store.orders = [];
  if (!store.invitations) store.invitations = [];
  if (!store.aiInsights) store.aiInsights = [];
  if (!store.topics) store.topics = [];

  const newUser = {
    id: `USER-IND-${Date.now()}`,
    name: fullName || "Business Owner",
    email: email.trim().toLowerCase(),
    password: password.trim(),
    role: "Admin",
    businessId: businessId
  };

  store.users.push(newUser);
  db.saveStore();

  const token = `token-${newUser.id}-${Date.now()}`;

  return res.json({
    success: true,
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      businessId: newUser.businessId
    },
    business: newBusiness,
    message: "Enterprise account created successfully! Start adding your products."
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const store = db.getStore();

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  if (!store.users) store.users = [];
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();

  const user = store.users.find(u => u.email.toLowerCase() === cleanEmail && u.password === cleanPass);

  if (!user) {
    // Demo accounts fallback
    if (cleanEmail === "mahek@manusrikitchen.in" && cleanPass === "password123") {
      const demoUser = store.users.find(u => u.email === cleanEmail) || {
        id: "USER-001",
        name: "Mahek Patel",
        email: "mahek@manusrikitchen.in",
        role: "Admin",
        businessId: store.business?.id || "BUS-FOOD-101"
      };
      return res.json({
        success: true,
        token: `token-${demoUser.id}`,
        user: demoUser,
        business: store.business
      });
    }

    return res.status(401).json({ success: false, message: "Invalid email or password. Please check your credentials or create a free account." });
  }

  // Switch active business context to the logged in user's business
  const userBiz = (store.businesses && store.businesses.find(b => b.id === user.businessId)) || 
                  (store.business && store.business.id === user.businessId ? store.business : null) || 
                  store.business;
  if (userBiz) store.business = userBiz;
  db.saveStore();

  return res.json({
    success: true,
    token: `token-${user.id}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      businessId: user.businessId
    },
    business: userBiz || store.business
  });
};

const me = (req, res) => {
  const store = db.getStore();
  return res.json({
    success: true,
    user: store.users && store.users[0] ? store.users[0] : {
      id: "USER-001",
      name: "Business Owner",
      email: "owner@business.in",
      role: "Admin",
      businessId: store.business?.id
    },
    business: store.business
  });
};

module.exports = { login, register, me };
