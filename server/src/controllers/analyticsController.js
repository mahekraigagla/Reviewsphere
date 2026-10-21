const db = require('../db');

const getOverview = (req, res) => {
  const store = db.getStore();
  const currentBizId = store.business ? store.business.id : null;
  const reviews = currentBizId ? store.reviews.filter(r => r.businessId === currentBizId) : [];

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 ? (reviews.reduce((a, b) => a + b.rating, 0) / totalReviews).toFixed(2) : (store.business?.rating || 5.0);
  const verifiedCount = reviews.filter(r => r.verified).length;
  const positiveCount = reviews.filter(r => r.sentiment === "Positive").length;
  const neutralCount = reviews.filter(r => r.sentiment === "Neutral").length;
  const negativeCount = reviews.filter(r => r.sentiment === "Negative").length;

  const ratingDist = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };

  const monthlyGrowth = [
    { month: "Jan", reviews: Math.round(totalReviews * 0.2), rating: Number(avgRating), positive: 90 },
    { month: "Feb", reviews: Math.round(totalReviews * 0.4), rating: Number(avgRating), positive: 92 },
    { month: "Mar", reviews: Math.round(totalReviews * 0.65), rating: Number(avgRating), positive: 93 },
    { month: "Apr", reviews: Math.round(totalReviews * 0.85), rating: Number(avgRating), positive: 94 },
    { month: "May", reviews: totalReviews, rating: Number(avgRating), positive: 95 }
  ];

  res.json({
    success: true,
    overview: {
      totalReviews: Number(totalReviews),
      avgRating: Number(avgRating),
      verifiedCount,
      positivePct: totalReviews > 0 ? Math.round((positiveCount / totalReviews) * 100) : 100,
      neutralPct: totalReviews > 0 ? Math.round((neutralCount / totalReviews) * 100) : 0,
      negativePct: totalReviews > 0 ? Math.round((negativeCount / totalReviews) * 100) : 0,
      nps: store.business?.nps || (totalReviews > 0 ? 78 : 0),
      collectionRate: totalReviews > 0 ? 34.2 : 0,
      pendingResponses: reviews.filter(r => !r.response).length
    },
    ratingDist,
    monthlyGrowth,
    recentReviews: reviews.slice(0, 10)
  });
};

const getSentiment = (req, res) => {
  const store = db.getStore();
  const currentBizId = store.business ? store.business.id : null;
  const reviews = currentBizId ? store.reviews.filter(r => r.businessId === currentBizId) : [];
  const total = reviews.length;

  const positive = reviews.filter(r => r.sentiment === "Positive").length;
  const neutral = reviews.filter(r => r.sentiment === "Neutral").length;
  const negative = reviews.filter(r => r.sentiment === "Negative").length;

  const sentimentTrends = [
    { month: "January", positive: 88, neutral: 8, negative: 4 },
    { month: "February", positive: 91, neutral: 6, negative: 3 },
    { month: "March", positive: 94, neutral: 4, negative: 2 }
  ];

  res.json({
    success: true,
    sentiment: {
      positiveCount: positive,
      positivePct: total > 0 ? Math.round((positive / total) * 100) : 100,
      neutralCount: neutral,
      neutralPct: total > 0 ? Math.round((neutral / total) * 100) : 0,
      negativeCount: negative,
      negativePct: total > 0 ? Math.round((negative / total) * 100) : 0,
      trends: sentimentTrends
    }
  });
};

const getNPS = (req, res) => {
  const store = db.getStore();
  res.json({
    success: true,
    nps: {
      score: store.business?.nps || 75,
      promotersPct: 82,
      passivesPct: 14,
      detractorsPct: 4,
      trend: [
        { month: "Jan", nps: 68 },
        { month: "Feb", nps: 72 },
        { month: "Mar", nps: 76 }
      ]
    }
  });
};

const getTopics = (req, res) => {
  const store = db.getStore();
  res.json({ success: true, topics: store.topics || [] });
};

module.exports = { getOverview, getSentiment, getNPS, getTopics };
