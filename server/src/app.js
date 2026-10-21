const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static widget JS file
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// Explicit route for widget.js
app.get('/widget.js', (req, res) => {
  res.sendFile(path.join(publicDir, 'widget.js'));
});
app.get('/api/widget.js', (req, res) => {
  res.sendFile(path.join(publicDir, 'widget.js'));
});

// Initialize persistent data store
db.loadStore();

// Register API Routes
app.use('/api', routes);

// Also mount routes at root in case Vercel rewrites strip /api prefix
app.use('/', routes);

// Base health check
const healthResponse = (req, res) => {
  res.json({
    platform: "ReviewSphere — Customer Review, Reputation & Feedback Intelligence Platform",
    status: "Operational",
    version: "1.0.0",
    pricing: "100% Free SaaS Platform"
  });
};

app.get('/', healthResponse);
app.get('/api', healthResponse);

module.exports = app;
