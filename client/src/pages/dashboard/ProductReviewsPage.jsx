import React, { useState } from 'react';
import { Package, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ProductReviewsPage = () => {
  const { products, reviews, loading } = useData();
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');

  if (loading || !products || products.length === 0) return <div className="p-8 text-center text-slate-700 font-semibold">Loading Product Reviews...</div>;

  const currentProduct = products.find(p => p.id === selectedProductId) || products[0];
  const prodReviews = reviews.filter(r => r.productId === currentProduct.id);

  return (
    <div className="space-y-8">
      
      {/* Header & Product Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Product Review Analytics</h1>
          <p className="text-xs text-slate-700 mt-1 font-medium">Select a product to inspect specific customer feedback and attribute breakdown.</p>
        </div>

        <select 
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="bg-white text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-teal-500 shadow-sm"
        >
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name} ({p.reviewsCount} Reviews)</option>
          ))}
        </select>
      </div>

      {/* Selected Product Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
        <div className="lg:col-span-4 h-48 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center p-3">
          <img src={currentProduct.image} alt={currentProduct.name} className="max-h-full max-w-full object-contain" />
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-teal-700 tracking-wider">{currentProduct.category}</span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs px-3 py-1 rounded-full font-bold">
              {currentProduct.positivePct}% Positive Sentiment
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">{currentProduct.name}</h2>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">{currentProduct.description}</p>

          <div className="flex items-center gap-6 pt-2 text-xs font-bold text-slate-800">
            <span className="text-amber-500 text-base">★ {currentProduct.rating} / 5</span>
            <span>Price: ₹{Number(currentProduct.price).toLocaleString('en-IN')}</span>
            <span>{prodReviews.length} Verified Product Reviews</span>
          </div>

          {/* Attributes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-700 font-semibold">Quality:</span>
              <div className="font-extrabold text-teal-800">{currentProduct.attributes?.quality || 4.8} / 5</div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-700 font-semibold">Value:</span>
              <div className="font-extrabold text-teal-800">{currentProduct.attributes?.value || 4.6} / 5</div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-700 font-semibold">Performance:</span>
              <div className="font-extrabold text-teal-800">{currentProduct.attributes?.performance || 4.9} / 5</div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-700 font-semibold">Packaging:</span>
              <div className="font-extrabold text-teal-800">{currentProduct.attributes?.packaging || 4.7} / 5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Product Customer Reviews</h3>
        {prodReviews.map(r => (
          <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-md">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{r.customerName}</span>
                {r.verified && (
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    ✓ Verified Buyer
                  </span>
                )}
              </div>
              <span className="text-amber-500 font-extrabold">{'★'.repeat(r.rating)}</span>
            </div>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">"{r.reviewText}"</p>
          </div>
        ))}
      </div>

    </div>
  );
};
