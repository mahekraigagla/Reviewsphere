const db = require('../db');

const getCustomers = (req, res) => {
  const store = db.getStore();
  const { search, status } = req.query;
  const currentBizId = store.business ? store.business.id : null;
  let list = currentBizId ? store.customers.filter(c => c.businessId === currentBizId) : [];

  if (search) {
    const s = search.toLowerCase();
    list = list.filter(c => c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s));
  }
  if (status) {
    list = list.filter(c => c.status === status);
  }

  res.json({ success: true, count: list.length, customers: list });
};

const getCustomerDetails = (req, res) => {
  const { id } = req.params;
  const store = db.getStore();
  const customer = store.customers.find(c => c.id === id);
  if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });

  const customerOrders = store.orders.filter(o => o.customerId === id);
  const customerReviews = store.reviews.filter(r => r.customerId === id);
  const customerInvitations = store.invitations.filter(i => i.customerId === id);

  res.json({
    success: true,
    customer,
    orders: customerOrders,
    reviews: customerReviews,
    invitations: customerInvitations
  });
};

const addCustomer = (req, res) => {
  const store = db.getStore();
  const { name, email, phone, location } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name and email are required" });
  }

  const newCust = {
    id: `CUST-${1000 + store.customers.length + 1}`,
    businessId: store.business.id,
    name,
    email,
    phone: phone || "",
    location: location || "India",
    ordersCount: 0,
    reviewsCount: 0,
    avgRating: 5.0,
    status: "Active",
    createdAt: new Date().toISOString()
  };

  store.customers.unshift(newCust);
  db.saveStore();
  res.json({ success: true, customer: newCust });
};

const updateCustomer = (req, res) => {
  const { id } = req.params;
  const store = db.getStore();
  const idx = store.customers.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Customer not found" });

  store.customers[idx] = { ...store.customers[idx], ...req.body };
  db.saveStore();
  res.json({ success: true, customer: store.customers[idx] });
};

const deleteCustomer = (req, res) => {
  const { id } = req.params;
  const store = db.getStore();
  store.customers = store.customers.filter(c => c.id !== id);
  db.saveStore();
  res.json({ success: true, message: "Customer deleted" });
};

const importCustomersCSV = (req, res) => {
  const store = db.getStore();
  const { rows } = req.body; // array of { name, email, phone, location }
  if (!Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ success: false, message: "No valid rows provided" });
  }

  let added = 0;
  rows.forEach(r => {
    if (r.email && !store.customers.some(c => c.email.toLowerCase() === r.email.toLowerCase())) {
      store.customers.unshift({
        id: `CUST-${1000 + store.customers.length + 1}`,
        businessId: store.business.id,
        name: r.name || "Imported Customer",
        email: r.email,
        phone: r.phone || "",
        location: r.location || "Imported",
        ordersCount: Number(r.ordersCount) || 1,
        reviewsCount: 0,
        avgRating: 5.0,
        status: "Active",
        createdAt: new Date().toISOString()
      });
      added++;
    }
  });

  db.saveStore();
  res.json({ success: true, addedCount: added, totalCustomers: store.customers.length });
};

module.exports = { getCustomers, getCustomerDetails, addCustomer, updateCustomer, deleteCustomer, importCustomersCSV };
