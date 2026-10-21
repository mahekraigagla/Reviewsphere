import React from 'react';
import { ShieldCheck, Star, ThumbsUp, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CompanyReviewsPage = () => {
  const { business, reviews, loading } = useData();

  if (loading || !business) return <div className="p-8 text-center text-slate-700 font-semibold">Loading Company Reviews...</div>;

  const companyReviews = reviews.filter(r => r.reviewType === 'Company');
  const avg = companyReviews.length > 0 ? (companyReviews.reduce((a, b) => a + b.rating, 0) / companyReviews.length).toFixed(2) : business.rating;

  return (
    <div className="space-y-8">
      
      {/* Company Header */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          <img src={business.logo} alt={business.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-300 shadow-md" />
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">{business.name} — Company Reputation</h1>
            <p className="text-xs text-slate-700 mt-1 font-medium">{business.description}</p>
            <div className="flex items-center gap-3 mt-2 text-xs font-semibold">
              <span className="text-amber-500 font-extrabold flex items-center gap-1">★ {avg}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-800 font-bold">{companyReviews.length} Company Reviews</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-700 font-bold">94% Would Recommend</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">NPS Score</div>
          <div className="text-3xl font-extrabold text-teal-700">+{business.nps}</div>
          <div className="text-[10px] text-slate-700 font-medium">Promoters vs Detractors</div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">All Verified Company Experience Reviews</h3>
        {companyReviews.map(r => (
          <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-md">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{r.customerName}</span>
                {r.verified && (
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    ✓ Verified Buyer
                  </span>
                )}
              </div>
              <span className="text-amber-500 font-extrabold text-sm">{'★'.repeat(r.rating)}</span>
            </div>

            <p className="text-xs text-slate-800 font-medium leading-relaxed">"{r.reviewText}"</p>

            <div className="text-[10px] text-slate-700 font-semibold flex justify-between pt-2 border-t border-slate-200">
              <span>Location: {r.customerLocation}</span>
              <span>Date: {new Date(r.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
