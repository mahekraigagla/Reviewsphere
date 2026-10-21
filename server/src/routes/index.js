const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/authController');
const businessCtrl = require('../controllers/businessController');
const customerCtrl = require('../controllers/customerController');
const productCtrl = require('../controllers/productController');
const orderCtrl = require('../controllers/orderController');
const reviewCtrl = require('../controllers/reviewController');
const campaignCtrl = require('../controllers/campaignController');
const analyticsCtrl = require('../controllers/analyticsController');
const aiCtrl = require('../controllers/aiController');
const widgetCtrl = require('../controllers/widgetController');

// Auth Routes
router.post('/auth/login', authCtrl.login);
router.post('/auth/register', authCtrl.register);
router.get('/auth/me', authCtrl.me);

// Business Routes
router.get('/business', businessCtrl.getBusiness);
router.put('/business', businessCtrl.updateBusiness);
router.post('/business/seed-demo-data', businessCtrl.seedDemoData);

// Customer Routes
router.get('/customers', customerCtrl.getCustomers);
router.get('/customers/:id', customerCtrl.getCustomerDetails);
router.post('/customers', customerCtrl.addCustomer);
router.put('/customers/:id', customerCtrl.updateCustomer);
router.delete('/customers/:id', customerCtrl.deleteCustomer);
router.post('/customers/import', customerCtrl.importCustomersCSV);

// Product Routes
router.get('/products', productCtrl.getProducts);
router.get('/products/:id', productCtrl.getProductDetails);
router.post('/products', productCtrl.addProduct);
router.put('/products/:id', productCtrl.updateProduct);
router.delete('/products/:id', productCtrl.deleteProduct);
router.post('/products/import', productCtrl.importProductsCSV);

// Order Routes
router.get('/orders', orderCtrl.getOrders);
router.post('/orders', orderCtrl.createOrder);
router.post('/orders/import', orderCtrl.importOrdersCSV);

// Review Routes
router.get('/reviews', reviewCtrl.getReviews);
router.get('/reviews/:id', reviewCtrl.getReviewDetails);
router.post('/reviews/request', reviewCtrl.requestReview);
router.post('/reviews/submit', reviewCtrl.submitReview);
router.post('/reviews/:id/reply', reviewCtrl.replyToReview);
router.post('/reviews/:id/flag', reviewCtrl.flagReview);

// Campaign Routes
router.get('/campaigns', campaignCtrl.getCampaigns);
router.post('/campaigns', campaignCtrl.createCampaign);
router.get('/invitations', campaignCtrl.getInvitations);

// Analytics Routes
router.get('/analytics/overview', analyticsCtrl.getOverview);
router.get('/analytics/sentiment', analyticsCtrl.getSentiment);
router.get('/analytics/nps', analyticsCtrl.getNPS);
router.get('/analytics/topics', analyticsCtrl.getTopics);

// AI Insights & Assistant Routes
router.get('/ai/insights', aiCtrl.getInsights);
router.post('/ai/assistant', aiCtrl.askAssistant);

// Widget Routes
router.get('/widgets', widgetCtrl.getWidgets);
router.post('/widgets', widgetCtrl.createWidget);

// Public Routes (No Auth Needed)
router.get('/public/business/:id', widgetCtrl.getPublicBusinessReviews);
router.get('/public/product/:id', widgetCtrl.getPublicProductReviews);

module.exports = router;
