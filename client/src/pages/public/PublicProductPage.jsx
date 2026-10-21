import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { useData } from '../../context/DataContext';

export const PublicProductPage = () => {
  const { products, reviews } = useData();
  const prod = products[0];

  if (!prod) return <div className="p-8 text-center text-slate-500">Loading Product...</div>;

  const prodReviews = reviews.filter(r => r.productId === prod.id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PublicHeader />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 h-64 bg-slate-100 rounded-2xl overflow-hidden">
            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
          </div>
          <div className="md:col-span-8 space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900">{prod.name}</h1>
            <p className="text-sm text-slate-600 leading-relaxed">{prod.description}</p>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="text-amber-500 text-lg">★ {prod.rating} / 5</span>
              <span className="text-slate-500">Price: ${prod.price}</span>
              <span className="text-teal-700 font-bold">{prod.positivePct}% Positive Sentiment</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Product Reviews</h3>
          {prodReviews.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold">{r.customerName}</span>
                <span className="text-amber-500 font-bold">{'★'.repeat(r.rating)}</span>
              </div>
              <p className="text-xs text-slate-700">"{r.reviewText}"</p>
            </div>
          ))}
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

