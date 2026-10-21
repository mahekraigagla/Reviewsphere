import React from 'react';
import { Star, ShieldCheck, ThumbsUp, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { useData } from '../../context/DataContext';

export const PublicBusinessProfile = () => {
  const { business, reviews, products } = useData();

  if (!business) return <div className="p-8 text-center text-slate-500">Loading Business Profile...</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PublicHeader />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        
        {/* Banner */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img src={business.logo} alt={business.name} className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-md" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold text-slate-900">{business.name}</h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ✓ Claimed Profile
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">{business.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs font-semibold text-slate-600">
                <span className="text-amber-500 font-extrabold text-sm flex items-center gap-1">
                  ★ {business.rating} / 5
                </span>
                <span>•</span>
                <span>{business.totalReviews.toLocaleString()} Total Reviews</span>
                <span>•</span>
                <span className="text-teal-700 font-bold">{business.positiveSentimentPct}% Positive Feedback</span>
              </div>
            </div>
          </div>

          <div className="bg-white text-slate-900 p-6 rounded-2xl text-center space-y-1 shadow-lg">
            <div className="text-xs uppercase font-extrabold text-teal-400">ReviewSphere Trust Score</div>
            <div className="text-4xl font-extrabold">9.8 / 10</div>
            <div className="text-[10px] text-slate-400">Based on verified order checks</div>
          </div>
        </div>

        {/* Customer Reviews Feed */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Verified Customer Reviews</h3>
          <div className="space-y-4">
            {reviews.map(r => (
              <div key={r.id} className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{r.customerName}</span>
                    {r.verified && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ✓ Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-amber-500 font-extrabold">{'★'.repeat(r.rating)}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">"{r.reviewText}"</p>
                <div className="text-[10px] text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <PublicFooter />
    </div>
  );
};

