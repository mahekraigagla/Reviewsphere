const db = require('../db');

const getCampaigns = (req, res) => {
  const store = db.getStore();
  const currentBizId = store.business ? store.business.id : null;
  const list = (store.campaigns || []).filter(c => currentBizId && c.businessId === currentBizId);
  res.json({ success: true, count: list.length, campaigns: list });
};

const createCampaign = (req, res) => {
  const store = db.getStore();
  const { name, reviewType, audience, channel, trigger, delayDays, reminderDays } = req.body;

  const newCamp = {
    id: `CAMP-${100 + (store.campaigns?.length || 0) + 1}`,
    businessId: store.business?.id || "BUS-IND-101",
    name: name || "New Review Campaign",
    reviewType: reviewType || "Company + Product",
    audience: audience || "Customers with delivered orders",
    channel: channel || "Email",
    trigger: trigger || "Order Delivered",
    delayDays: Number(delayDays) || 3,
    reminderDays: Number(reminderDays) || 2,
    invitationsSent: 0,
    openedCount: 0,
    reviewsReceived: 0,
    collectionRate: 0,
    status: "Active",
    createdAt: new Date().toISOString()
  };

  if (!store.campaigns) store.campaigns = [];
  store.campaigns.unshift(newCamp);
  db.saveStore();
  res.json({ success: true, campaign: newCamp });
};

const getInvitations = (req, res) => {
  const store = db.getStore();
  const currentBizId = store.business ? store.business.id : null;
  const list = (store.invitations || []).filter(i => currentBizId && i.businessId === currentBizId);
  res.json({ success: true, invitations: list });
};

module.exports = { getCampaigns, createCampaign, getInvitations };
