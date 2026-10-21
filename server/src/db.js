const fs = require('fs');
const path = require('path');

// Detect serverless environment (Vercel, AWS Lambda, etc.)
const isServerless = Boolean(
  process.env.VERCEL || 
  process.env.AWS_LAMBDA_FUNCTION_NAME || 
  process.env.LAMBDA_TASK_ROOT
);

// Bundled repository seed file (read-only in serverless)
const BUNDLED_FILE = path.join(__dirname, '..', 'data', 'store.json');

// Target directory and active store file (use /tmp in serverless)
const DATA_DIR = isServerless ? '/tmp' : path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  // Graceful fallback for read-only environments
}

// Pre-load bundled JSON data safely so it is traced by Vercel NFT bundler
let bundledStore = null;
try {
  bundledStore = require('../data/store.json');
} catch (e) {
  bundledStore = null;
}

const getInitialData = () => {
  if (bundledStore) {
    try {
      return JSON.parse(JSON.stringify(bundledStore));
    } catch (e) {
      // fallback
    }
  }
  const seed = require('./seed/seedData');
  return seed.generateSeedData();
};

let store = null;

const loadStore = () => {
  if (store) return store;
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      store = JSON.parse(raw);
      return store;
    } catch (e) {
      console.error("Error reading store file, resetting to initial seed:", e);
    }
  }
  store = getInitialData();
  saveStore();
  return store;
};

const saveStore = () => {
  if (!store) return;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    console.warn("Storage write skipped or failed (safe in serverless):", err.message);
  }
};

const resetStore = () => {
  store = getInitialData();
  saveStore();
  return store;
};

module.exports = {
  loadStore,
  saveStore,
  resetStore,
  getStore: () => loadStore()
};
