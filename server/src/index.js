const app = require('./app');

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`  ReviewSphere REST API Server running on port ${PORT}`);
    console.log(`  Local:   http://localhost:${PORT}`);
    console.log(`  Widget Engine Script: http://localhost:${PORT}/widget.js`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
