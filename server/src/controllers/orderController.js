const db = require('../db');

const getOrders = (req, res) => {
  const store = db.getStore();
  const { search, status } = req.query;
  const currentBizId = store.business ? store.business.id : null;
  let list = currentBizId ? store.orders.filter(o => o.businessId === currentBizId) : [];

  if (search) {
    const s = search.toLowerCase();
    list = list.filter(o => o.id.toLowerCase().includes(s) || o.customerName.toLowerCase().includes(s) || o.productName.toLowerCase().includes(s));
  }
  if (status) {
    list = list.filter(o => o.status === status);
  }

  res.json({ success: true, count: list.length, orders: list });
};

const createOrder = (req, res) => {
  const store = db.getStore();
  const { customerId, productId, amount, status } = req.body;

  const customer = store.customers.find(c => c.id === customerId);
  const product = store.products.find(p => p.id === productId);

  if (!customer || !product) {
    return res.status(400).json({ success: false, message: "Valid customer and product are required" });
  }

  const newOrd = {
    id: `ORD-${5000 + store.orders.length + 1}`,
    businessId: store.business.id,
    customerId: customer.id,
    customerName: customer.name,
    customerEmail: customer.email,
    productId: product.id,
    productName: product.name,
    amount: Number(amount) || product.price,
    status: status || "Delivered",
    orderDate: new Date().toISOString(),
    deliveryDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    invitationSent: false
  };

  store.orders.unshift(newOrd);
  customer.ordersCount = (customer.ordersCount || 0) + 1;

  db.saveStore();
  res.json({ success: true, order: newOrd });
};

const importOrdersCSV = (req, res) => {
  const store = db.getStore();
  const { rows } = req.body;
  if (!Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ success: false, message: "No valid rows provided" });
  }

  let added = 0;
  rows.forEach(r => {
    if (r.customerEmail && r.productName) {
      let cust = store.customers.find(c => c.email.toLowerCase() === r.customerEmail.toLowerCase());
      if (!cust) {
        cust = {
          id: `CUST-${1000 + store.customers.length + 1}`,
          businessId: store.business.id,
          name: r.customerName || "Order Customer",
          email: r.customerEmail,
          phone: "",
          location: "Imported",
          ordersCount: 1,
          reviewsCount: 0,
          avgRating: 5.0,
          status: "Active",
          createdAt: new Date().toISOString()
        };
        store.customers.unshift(cust);
      }

      let prod = store.products.find(p => p.name.toLowerCase() === r.productName.toLowerCase());
      if (!prod) {
        prod = store.products[0]; // fallback
      }

      store.orders.unshift({
        id: r.orderId || `ORD-${5000 + store.orders.length + 1}`,
        businessId: store.business.id,
        customerId: cust.id,
        customerName: cust.name,
        customerEmail: cust.email,
        productId: prod.id,
        productName: prod.name,
        amount: Number(r.amount) || prod.price,
        status: r.status || "Delivered",
        orderDate: r.orderDate || new Date().toISOString(),
        deliveryDate: r.deliveryDate || new Date().toISOString(),
        invitationSent: false
      });
      added++;
    }
  });

  db.saveStore();
  res.json({ success: true, addedCount: added, totalOrders: store.orders.length });
};

module.exports = { getOrders, createOrder, importOrdersCSV };
