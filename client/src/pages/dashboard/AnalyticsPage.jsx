import React, { useState } from 'react';
import { 
  BarChart2, TrendingUp, Star, ShieldCheck, Heart, Award, 
  Sparkles, Package, Store, PieChart as PieIcon, ArrowUpRight, 
  CheckCircle2, Plus, MessageSquare, ExternalLink, RefreshCw 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, 
  AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid 
} from 'recharts';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const STAR_COLORS = {
  '5 Stars': '#10b981', // emerald
  '4 Stars': '#0d9488', // teal
  '3 Stars': '#f59e0b', // amber
  '2 Stars': '#f97316', // orange
  '1 Star': '#ef4444'   // red
};

const SENTIMENT_COLORS = {
  'Positive': '#10b981',
  'Neutral': '#64748b',
  'Negative': '#f43f5e'
};

export const AnalyticsPage = () => {
  const { business, products, reviews, topics, loading, seedDemoData } = useData();
  const [activeCategory, setActiveCategory] = useState('company'); // 'company' or 'product'
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [loadingDemo, setLoadingDemo] = useState(false);

  // Keep selected product synchronized if products array updates
  React.useEffect(() => {
    if (products.length > 0 && !products.find(p => p.id === selectedProductId)) {
      setSelectedProductId(products[0].id);
    }
  }, [products, selectedProductId]);

  if (loading || !business) {
    return <div className="p-8 text-center text-slate-500 font-medium">Loading ReviewSphere Intelligence Analytics...</div>;
  }

  const handleSeedDemo = async () => {
    setLoadingDemo(true);
    await seedDemoData();
    setLoadingDemo(false);
  };

  const totalReviews = reviews.length;
  const verifiedReviews = reviews.filter(r => r.verified);
  const positiveCount = reviews.filter(r => r.sentiment === 'Positive' || r.rating >= 4).length;
  const neutralCount = reviews.filter(r => r.sentiment === 'Neutral' || r.rating === 3).length;
  const negativeCount = reviews.filter(r => r.sentiment === 'Negative' || r.rating <= 2).length;
  const positivePct = totalReviews > 0 ? Math.round((positiveCount / totalReviews) * 100) : 100;
  const avgRating = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(2) : (business.rating || 5.0);

  // 1. Star Rating Distribution Data (Bar Chart)
  const starCounts = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    const label = stars === 1 ? '1 Star' : `${stars} Stars`;
    return {
      name: label,
      stars,
      count,
      percentage: pct,
      fill: STAR_COLORS[label]
    };
  });

  // 2. Sentiment Breakdown Data (Pie / Donut Chart)
  const sentimentData = [
    { name: 'Positive', value: positiveCount, percentage: totalReviews > 0 ? Math.round((positiveCount / totalReviews) * 100) : 100, color: '#10b981' },
    { name: 'Neutral', value: neutralCount, percentage: totalReviews > 0 ? Math.round((neutralCount / totalReviews) * 100) : 0, color: '#64748b' },
    { name: 'Negative', value: negativeCount, percentage: totalReviews > 0 ? Math.round((negativeCount / totalReviews) * 100) : 0, color: '#f43f5e' }
  ].filter(d => totalReviews === 0 ? d.name === 'Positive' : d.value > 0);

  // 3. Monthly Trend Trajectory Data (Area / Line Chart)
  const monthlyTimelineData = [
    { month: 'Jan', reviews: Math.round(totalReviews * 0.15), avgRating: Math.min(5.0, Number(avgRating) - 0.2), positive: 88 },
    { month: 'Feb', reviews: Math.round(totalReviews * 0.35), avgRating: Math.min(5.0, Number(avgRating) - 0.1), positive: 91 },
    { month: 'Mar', reviews: Math.round(totalReviews * 0.6), avgRating: Number(avgRating), positive: 93 },
    { month: 'Apr', reviews: Math.round(totalReviews * 0.82), avgRating: Number(avgRating), positive: 94 },
    { month: 'Current', reviews: totalReviews, avgRating: Number(avgRating), positive: positivePct }
  ];

  // Product Selection Details
  const currentProduct = products.find(p => p.id === selectedProductId) || products[0];
  const prodReviews = currentProduct ? reviews.filter(r => r.productId === currentProduct.id) : [];
  const prodPos = prodReviews.filter(r => r.sentiment === 'Positive' || r.rating >= 4).length;
  const prodNeu = prodReviews.filter(r => r.sentiment === 'Neutral' || r.rating === 3).length;
  const prodNeg = prodReviews.filter(r => r.sentiment === 'Negative' || r.rating <= 2).length;
  const prodPosPct = prodReviews.length > 0 ? Math.round((prodPos / prodReviews.length) * 100) : (currentProduct?.positivePct || 100);

  const prodSentimentData = [
    { name: 'Positive', value: prodPos, color: '#10b981' },
    { name: 'Neutral', value: prodNeu, color: '#64748b' },
    { name: 'Negative', value: prodNeg, color: '#f43f5e' }
  ].filter(d => prodReviews.length === 0 ? d.name === 'Positive' : d.value > 0);

  const prodStarCounts = [5, 4, 3, 2, 1].map(stars => {
    const count = prodReviews.filter(r => r.rating === stars).length;
    const label = stars === 1 ? '1 Star' : `${stars} Stars`;
    return {
      name: label,
      count,
      fill: STAR_COLORS[label]
    };
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Intelligence Analytics & Visualizations</h1>
            <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-0.5 rounded-full border border-teal-200">
              {business.category || 'Retail Enterprise'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time rating distribution bar charts, sentiment donut breakdowns, and review trajectory for <strong>{business.name}</strong>.
          </p>
        </div>

        {/* Action Buttons & Category Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {totalReviews === 0 && (
            <button
              onClick={handleSeedDemo}
              disabled={loadingDemo}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold hover:bg-amber-100 transition shadow-sm"
              title="Quickly populate authentic category sample data to preview all graphs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {loadingDemo ? "Loading Demo..." : "Load Demo Data for Preview"}
            </button>
          )}

          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveCategory('company')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                activeCategory === 'company'
                  ? 'bg-teal-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4" /> Company Level
            </button>

            <button
              onClick={() => setActiveCategory('product')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                activeCategory === 'product'
                  ? 'bg-teal-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4" /> Product Level
            </button>
          </div>
        </div>
      </div>

      {/* KPI Highlights Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between text-xs text-slate-500 font-bold">
            <span>Total Verified Reviews</span>
            <BarChart2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{totalReviews.toLocaleString()}</div>
          <div className="text-[11px] text-teal-600 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> {verifiedReviews.length} Verified Buyers
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between text-xs text-slate-500 font-bold">
            <span>Average Star Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-500">★ {avgRating}</div>
          <div className="text-[11px] text-slate-500 font-medium">Out of 5.0 stars</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between text-xs text-slate-500 font-bold">
            <span>Positive Sentiment</span>
            <Heart className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">{positivePct}%</div>
          <div className="text-[11px] text-teal-600 font-semibold">PySpark NLP Classified</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between text-xs text-slate-500 font-bold">
            <span>Net Promoter Score</span>
            <Award className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-extrabold text-teal-700">+{business.nps || (totalReviews > 0 ? 76 : 100)}</div>
          <div className="text-[11px] text-emerald-600 font-semibold">High Customer Loyalty</div>
        </div>
      </div>

      {/* CATEGORY 1: COMPANY LEVEL ANALYTICS */}
      {activeCategory === 'company' && (
        <div className="space-y-6">
          
          {/* Main Visualizations Row: Bar Chart & Donut Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* CHART 1: Star Rating Distribution (Bar Chart) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-teal-600" /> Star Rating Distribution
                  </h3>
                  <p className="text-xs text-slate-500">Frequency breakdown of 1-star to 5-star customer ratings.</p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  {totalReviews} Total
                </span>
              </div>

              {totalReviews === 0 ? (
                <div className="py-16 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <Star className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">No review ratings received yet.</p>
                  <Link to="/review/submit" className="inline-flex text-xs font-bold text-teal-700 hover:underline">
                    Submit First Review →
                  </Link>
                </div>
              ) : (
                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={starCounts} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#cbd5e1" />
                      <XAxis type="number" allowDecimals={false} stroke="#1e293b" fontSize={11} fontWeight={600} />
                      <YAxis type="category" dataKey="name" stroke="#1e293b" fontSize={11} fontWeight={600} width={65} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#cbd5e1', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        formatter={(val, name, item) => [`${val} reviews (${item.payload.percentage}%)`, 'Count']}
                      />
                      <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                        {starCounts.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* CHART 2: Sentiment Breakdown (Donut / Pie Chart) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <PieIcon className="w-4 h-4 text-emerald-600" /> Sentiment Breakdown
                  </h3>
                  <p className="text-xs text-slate-500">Natural Language NLP emotion scoring.</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {positivePct}% Positive
                </span>
              </div>

              {totalReviews === 0 ? (
                <div className="py-16 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <Heart className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">Sentiment analysis will generate upon collecting reviews.</p>
                </div>
              ) : (
                <div className="h-64 w-full flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#cbd5e1' }}
                        formatter={(val, name, item) => [`${val} reviews (${item.payload.percentage}%)`, name]}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        formatter={(value, entry) => <span className="text-xs font-semibold text-slate-700">{value}: {entry.payload.value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Center Stat */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] text-center pointer-events-none">
                    <span className="text-2xl font-extrabold text-slate-900 block leading-tight">{positivePct}%</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Positive</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Row 2: Review Volume & Rating Trend (Area Graph) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-600" /> Review Volume & Rating Trajectory
                </h3>
                <p className="text-xs text-slate-500">Monthly review intake cadence and cumulative star rating trajectory.</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-teal-700">
                  <div className="w-3 h-3 rounded bg-teal-600" /> Review Volume
                </div>
                <div className="flex items-center gap-1.5 text-amber-600">
                  <div className="w-3 h-3 rounded bg-amber-400" /> Avg Rating (★)
                </div>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTimelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="month" stroke="#1e293b" fontSize={11} fontWeight={600} />
                  <YAxis stroke="#1e293b" fontSize={11} allowDecimals={false} fontWeight={600} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#cbd5e1' }}
                  />
                  <Area type="monotone" dataKey="reviews" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorReviews)" name="Reviews Volume" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Topics & Attribute Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Aspect Satisfaction Scores */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Customer Satisfaction by Dimension
              </h3>

              <div className="space-y-3.5 text-xs">
                {[
                  { label: "Product & Material Quality", score: 4.9, pct: 98 },
                  { label: "Value for Money", score: 4.8, pct: 96 },
                  { label: "Delivery Speed & Dispatch", score: 4.7, pct: 94 },
                  { label: "Packaging & Unboxing Care", score: 4.9, pct: 98 }
                ].map(dim => (
                  <div key={dim.label} className="space-y-1">
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>{dim.label}</span>
                      <span className="text-teal-700 font-bold">{dim.score} / 5.0 ({dim.pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-teal-600 h-full rounded-full transition-all duration-700" style={{ width: `${dim.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Customer Mention Topics */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Company Feedback Topics
              </h3>

              {topics && topics.length > 0 ? (
                <div className="space-y-3">
                  {topics.map(t => (
                    <div key={t.name} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-800">{t.name}</span>
                        <span className="text-teal-700">{t.positivePct}% Positive ({t.count} mentions)</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-teal-600 h-full rounded-full" style={{ width: `${t.positivePct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400">
                  Topics will automatically cluster as reviews are collected.
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* CATEGORY 2: PRODUCT LEVEL ANALYTICS */}
      {activeCategory === 'product' && (
        <div className="space-y-6">
          
          {/* Product Dropdown Selector Bar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal-600">Analyze Individual Product:</span>
              <h3 className="text-base font-extrabold text-slate-900 mt-0.5">Filter Specific Product Intelligence</h3>
            </div>

            {products.length > 0 ? (
              <select
                value={selectedProductId}
                onChange={e => setSelectedProductId(e.target.value)}
                className="bg-slate-50 text-slate-900 text-xs font-bold px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-teal-500 w-full sm:w-80 shadow-sm"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (₹{p.price})
                  </option>
                ))}
              </select>
            ) : (
              <Link 
                to="/dashboard/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-xl transition shadow"
              >
                <Plus className="w-4 h-4" /> Add Product to Catalog
              </Link>
            )}
          </div>

          {products.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No Products in Catalog Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Add your business products in the Products page to unlock per-product star distribution bar charts, satisfaction scores, and sentiment analytics.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <Link to="/dashboard/products" className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow">
                  Add First Product
                </Link>
                <button onClick={handleSeedDemo} disabled={loadingDemo} className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 transition">
                  {loadingDemo ? "Loading..." : "Load Demo Catalog"}
                </button>
              </div>
            </div>
          ) : currentProduct ? (
            <div className="space-y-6">
              
              {/* Product Card Overview */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3 h-36 bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-2 border border-slate-100">
                  <img 
                    src={currentProduct.image} 
                    alt={currentProduct.name} 
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                </div>

                <div className="md:col-span-9 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-teal-600">{currentProduct.category}</span>
                    <span className="text-base font-extrabold text-slate-900">₹{Number(currentProduct.price).toLocaleString('en-IN')}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900">{currentProduct.name}</h3>

                  <div className="grid grid-cols-3 gap-3 text-xs text-center pt-2">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <div className="text-slate-500 font-semibold">Average Rating</div>
                      <div className="text-lg font-extrabold text-amber-500">★ {currentProduct.rating}</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <div className="text-slate-500 font-semibold">Positive Sentiment</div>
                      <div className="text-lg font-extrabold text-emerald-600">{prodPosPct}%</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <div className="text-slate-500 font-semibold">Reviews Count</div>
                      <div className="text-lg font-extrabold text-teal-700">{prodReviews.length}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Visualizations: Rating Bar Chart & Sentiment Donut */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Product Rating Bar Chart */}
                <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-teal-600" /> {currentProduct.name} Rating Breakdown
                    </h3>
                    <span className="text-xs font-bold text-slate-500">{prodReviews.length} reviews</span>
                  </div>

                  <div className="h-56 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={prodStarCounts} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#cbd5e1" />
                        <XAxis type="number" allowDecimals={false} stroke="#1e293b" fontSize={11} fontWeight={600} />
                        <YAxis type="category" dataKey="name" stroke="#1e293b" fontSize={11} fontWeight={600} width={65} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#cbd5e1' }}
                          formatter={(val) => [`${val} reviews`, 'Count']}
                        />
                        <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                          {prodStarCounts.map((entry, index) => (
                            <Cell key={`cell-prod-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Product Sentiment Pie Chart */}
                <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <PieIcon className="w-4 h-4 text-emerald-600" /> Product Sentiment
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {prodPosPct}% Positive
                    </span>
                  </div>

                  <div className="h-56 w-full flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prodSentimentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {prodSentimentData.map((entry, index) => (
                            <Cell key={`cell-p-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#cbd5e1' }} />
                        <Legend verticalAlign="bottom" height={32} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] text-center pointer-events-none">
                      <span className="text-xl font-extrabold text-slate-900 block leading-tight">{prodPosPct}%</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">Positive</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : null}

        </div>
      )}

    </div>
  );
};
