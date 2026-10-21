const db = require('../db');

const getProducts = (req, res) => {
  const store = db.getStore();
  const { search, category } = req.query;
  const currentBizId = store.business ? store.business.id : null;
  
  // Strictly filter products to current business - NEVER show unowned or other business products!
  let list = currentBizId ? store.products.filter(p => p.businessId === currentBizId) : [];

  if (search) {
    const s = search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
  }
  if (category) {
    list = list.filter(p => p.category === category);
  }

  res.json({ success: true, count: list.length, products: list });
};

const getProductDetails = (req, res) => {
  const { id } = req.params;
  const store = db.getStore();
  const product = store.products.find(p => p.id === id);
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });

  const productReviews = store.reviews.filter(r => r.productId === id);
  const productOrders = store.orders.filter(o => o.productId === id);

  res.json({
    success: true,
    product,
    reviews: productReviews,
    ordersCount: productOrders.length
  });
};

const addProduct = (req, res) => {
  const store = db.getStore();
  const { name, category, price, description, image, attributes } = req.body;
  if (!name || !price) {
    return res.status(400).json({ success: false, message: "Product name and price are required" });
  }

  // Fallback image based on category
  let defaultImg = image && image.trim().startsWith('http') ? image.trim() : "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80";
  
  const catLower = (category || store.business?.category || "").toLowerCase();
  if (!image || !image.trim().startsWith('http')) {
    if (catLower.includes("food") || catLower.includes("beverage") || catLower.includes("restaurant") || catLower.includes("hotel") || catLower.includes("dining")) {
      defaultImg = "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80";
    } else if (catLower.includes("fashion") || catLower.includes("apparel") || catLower.includes("clothing") || catLower.includes("saree") || catLower.includes("kurti")) {
      defaultImg = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80";
    } else if (catLower.includes("laptop") || catLower.includes("computer") || catLower.includes("electronics") || catLower.includes("audio")) {
      defaultImg = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80";
    } else if (catLower.includes("health") || catLower.includes("wellness") || catLower.includes("ayurveda") || catLower.includes("organic")) {
      defaultImg = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80";
    } else if (catLower.includes("home") || catLower.includes("kitchen") || catLower.includes("living")) {
      defaultImg = "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=600&auto=format&fit=crop&q=80";
    }
  }

  const currentBizId = store.business?.id || `BUS-IND-${Date.now()}`;

  const newProd = {
    id: `PROD-${currentBizId.slice(-4)}-${Date.now()}`,
    businessId: currentBizId,
    name: name.trim(),
    category: category || store.business?.category || "General",
    price: Number(price),
    rating: 5.0,
    reviewsCount: 0,
    positivePct: 100,
    image: defaultImg,
    description: description || "Authentic verified catalog item.",
    attributes: attributes || { quality: 5.0, value: 5.0, performance: 5.0, packaging: 5.0 }
  };

  store.products.unshift(newProd);
  db.saveStore();
  res.json({ success: true, product: newProd });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const store = db.getStore();
  const idx = store.products.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Product not found" });

  store.products[idx] = { ...store.products[idx], ...req.body };
  db.saveStore();
  res.json({ success: true, product: store.products[idx] });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const store = db.getStore();
  store.products = store.products.filter(p => p.id !== id);
  db.saveStore();
  res.json({ success: true, message: "Product deleted" });
};

const importProductsCSV = (req, res) => {
  const store = db.getStore();
  const { rows } = req.body;
  if (!Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ success: false, message: "No valid rows provided" });
  }

  const currentBizId = store.business?.id || `BUS-IND-${Date.now()}`;
  let added = 0;
  rows.forEach(r => {
    if (r.name) {
      store.products.unshift({
        id: `PROD-${currentBizId.slice(-4)}-${100 + store.products.length + 1}`,
        businessId: currentBizId,
        name: r.name,
        category: r.category || store.business?.category || "General",
        price: Number(r.price) || 999,
        rating: 5.0,
        reviewsCount: 0,
        positivePct: 100,
        image: r.image || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
        description: r.description || "Imported catalog item",
        attributes: { quality: 5, value: 5, performance: 5, packaging: 5 }
      });
      added++;
    }
  });

  db.saveStore();
  res.json({ success: true, addedCount: added, totalProducts: store.products.filter(p => p.businessId === currentBizId).length });
};

module.exports = { getProducts, getProductDetails, addProduct, updateProduct, deleteProduct, importProductsCSV };
