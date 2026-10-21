import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, ShieldCheck, MessageSquare, TrendingUp, Heart, ArrowUpRight, 
  Users, ShoppingCart, Sparkles, Filter, ChevronRight, Award
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ProductRotator } from '../../components/common/ProductRotator';

export const OverviewPage = () => {
  const { business, reviews, products, customers, orders, loading } = useData();

  if (loading || !business) {
    return <div className="p-8 text-center text-slate-400">Loading ReviewSphere Intelligence Dashboard...</div>;
  }

  const verifiedCount = reviews.filter(r => r.verified).length;
  const positiveCount = reviews.filter(r => r.sentiment === 'Positive').length;
  const positivePct = reviews.length > 0 ? Math.round((positiveCount / reviews.length) * 100) : 82;
  const pendingResponses = reviews.filter(r => !r.response).length;

  return (
    <div className="space-y-8">
      
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{business.name} Overview</span>
            <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-teal-500/30">
              Verified Seller
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Real-time review collection, reputation analytics & customer feedback command center.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            to="/dashboard/reviews" 
            className="bg-slate-200 hover:bg-slate-700 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-teal-400" /> View Inbox ({pendingResponses} Pending)
          </Link>
          <Link 
            to="/dashboard/campaigns" 
            className="bg-teal-600 hover:bg-teal-500 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-teal-600/20 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Create Campaign
          </Link>
        </div>
      </div>

      {/* 5-SECOND AUTO ROTATING PRODUCT CAROUSEL SHOWCASE (User Requirement!) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" /> Featured Product Intelligence (5s Auto Rotation)
          </h3>
          <Link to="/dashboard/products" className="text-xs text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1">
            Manage Products ({products.length}) <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <ProductRotator />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Total Reviews</span>
            <MessageSquare className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{business.totalReviews.toLocaleString()}</div>
          <div className="text-[11px] text-teal-400 flex items-center gap-1 font-semibold">
            <ArrowUpRight className="w-3 h-3" /> +12.4% this month
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Average Rating</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>{business.rating}</span>
            <span className="text-sm font-normal text-amber-400">★★★★★</span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Across all company & product reviews</div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Verified Reviews</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{verifiedCount.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">
            {Math.round((verifiedCount / (reviews.length || 1)) * 100)}% Verified Buyer Rate
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Positive Sentiment</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{positivePct}%</div>
          <div className="text-[11px] text-teal-400 font-semibold">PySpark MLlib Analyzed</div>
        </div>

      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold">NPS Score</div>
            <div className="text-xl font-extrabold text-teal-400">+{business.nps}</div>
          </div>
          <Award className="w-6 h-6 text-teal-500 opacity-60" />
        </div>

        <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold">Collection Rate</div>
            <div className="text-xl font-extrabold text-slate-900">27.4%</div>
          </div>
          <TrendingUp className="w-6 h-6 text-teal-500 opacity-60" />
        </div>

        <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold">Registered Customers</div>
            <div className="text-xl font-extrabold text-slate-900">{customers.length}</div>
          </div>
          <Users className="w-6 h-6 text-teal-500 opacity-60" />
        </div>

        <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold">Total Verified Orders</div>
            <div className="text-xl font-extrabold text-slate-900">{orders.length}</div>
          </div>
          <ShoppingCart className="w-6 h-6 text-teal-500 opacity-60" />
        </div>

      </div>

      {/* Ratings & Recent Inbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Rating Breakdown & Sentiment Summary */}
        <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Rating Distribution</h3>
          
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter(r => r.rating === star).length;
              const pct = Math.round((count / (reviews.length || 1)) * 100);
              return (
                <div key={star} className="flex items-center gap-3 text-xs font-semibold">
                  <div className="w-12 text-slate-400 flex items-center gap-1">
                    <span>{star}</span> <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 bg-white h-2.5 rounded-full overflow-hidden border border-slate-200">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="w-12 text-right text-slate-400">{count} ({pct}%)</div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-xs">
            <span className="text-slate-400 font-semibold">Response Rate</span>
            <span className="text-teal-400 font-bold">94% Handled</span>
          </div>
        </div>

        {/* Recent Reviews Inbox */}
        <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Latest Verified Reviews</h3>
            <Link to="/dashboard/reviews" className="text-xs text-teal-400 hover:text-teal-300 font-bold">
              View All Timeline →
            </Link>
          </div>

          <div className="space-y-3">
            {reviews.slice(0, 5).map((r) => (
              <div key={r.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 hover:border-slate-400 transition shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{r.customerName}</span>
                    {r.verified && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        ✓ Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-amber-500 font-extrabold text-sm">{'★'.repeat(r.rating)}</span>
                </div>

                <p className="text-xs text-slate-800 font-medium line-clamp-2 leading-relaxed">"{r.reviewText}"</p>

                <div className="flex items-center justify-between text-[11px] text-slate-700 font-medium pt-1">
                  <span>Product: {r.productName || 'Company Experience'}</span>
                  <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

