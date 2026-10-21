const db = require('../db');
const { generateCategoryBusinessData } = require('../seed/seedData');

const getBusiness = (req, res) => {
  const store = db.getStore();
  res.json({ success: true, business: store.business });
};

const updateBusiness = (req, res) => {
  const store = db.getStore();
  const { name, website, category, description, logo, publicBaseUrl } = req.body;

  if (name) store.business.name = name;
  if (website) store.business.website = website;
  if (category) store.business.category = category;
  if (description) store.business.description = description;
  if (logo) store.business.logo = logo;
  if (publicBaseUrl !== undefined) store.business.publicBaseUrl = publicBaseUrl;

  db.saveStore();
  res.json({ success: true, business: store.business });
};

const seedDemoData = (req, res) => {
  const store = db.getStore();
  if (!store.business) {
    return res.status(400).json({ success: false, message: "No active business found" });
  }

  const bizId = store.business.id;
  const bizCategory = store.business.category || 'Fashion';

  // Generate category-specific demo data
  const demoData = generateCategoryBusinessData(bizCategory, store.business);

  // Remove existing products/reviews for this business before replacing
  store.products = (store.products || []).filter(p => p.businessId !== bizId).concat(demoData.products);
  store.reviews = (store.reviews || []).filter(r => r.businessId !== bizId).concat(demoData.reviews);
  store.customers = (store.customers || []).filter(c => c.businessId !== bizId).concat(demoData.customers);
  store.orders = (store.orders || []).filter(o => o.businessId !== bizId).concat(demoData.orders);
  store.aiInsights = (store.aiInsights || []).filter(ins => ins.businessId !== bizId).concat(demoData.aiInsights.map(i => ({ ...i, businessId: bizId })));
  store.topics = demoData.topics;
  store.invitations = (store.invitations || []).filter(i => i.businessId !== bizId).concat(demoData.invitations);

  // Update business metrics
  store.business.totalReviews = demoData.business.totalReviews;
  store.business.rating = demoData.business.rating;
  store.business.verifiedCount = demoData.business.verifiedCount;
  store.business.positiveSentimentPct = demoData.business.positiveSentimentPct;
  store.business.nps = demoData.business.nps;

  db.saveStore();

  res.json({
    success: true,
    message: `Sample ${bizCategory} products, verified customer reviews & AI insights loaded successfully!`,
    business: store.business,
    productsCount: demoData.products.length,
    reviewsCount: demoData.reviews.length
  });
};

module.exports = { getBusiness, updateBusiness, seedDemoData };
