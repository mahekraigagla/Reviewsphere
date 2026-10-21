import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Sparkles, Pause, Play } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ProductRotator = () => {
  const { products } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!products || products.length === 0 || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000); // 5-second auto rotation

    return () => clearInterval(interval);
  }, [products, isPlaying]);

  if (!products || products.length === 0) return null;

  const currentProduct = products[currentIndex];

  return (
    <div className="relative bg-[#fbf3e6] border border-[#f3e4cb] rounded-3xl p-6 shadow-xl space-y-4">
      
      {/* Top Header Tag */}
      <div className="flex items-center justify-between">
        <div className="bg-[#fef08a] text-[#713f12] text-xs font-extrabold px-3.5 py-1 rounded-full shadow-sm">
          Product reviews • Auto-Rotating (5s)
        </div>

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-xs bg-white text-slate-900 border border-slate-200 px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-sm hover:bg-slate-50 transition"
        >
          {isPlaying ? <Pause className="w-3 h-3 text-[#135f52]" /> : <Play className="w-3 h-3 text-[#135f52]" />}
          {isPlaying ? "Auto (5s)" : "Paused"}
        </button>
      </div>

      {/* Main Product Card */}
      <div className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Product Image */}
        <div className="md:col-span-4 h-48 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-3 border border-slate-100">
          <img 
            key={currentProduct.id}
            src={currentProduct.image} 
            alt={currentProduct.name} 
            className="max-h-full max-w-full object-contain transition-all duration-500"
          />
        </div>

        {/* Details & Attribute Sliders */}
        <div className="md:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-[#135f52]">{currentProduct.category}</span>
            <span className="text-xs font-extrabold text-slate-900">₹{Number(currentProduct.price).toLocaleString('en-IN')}</span>
          </div>

          <h3 className="text-xl font-extrabold text-slate-900">{currentProduct.name}</h3>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-amber-500 font-extrabold text-base">★ {currentProduct.rating}</span>
            <span className="text-slate-800 font-bold">Based on {currentProduct.reviewsCount} verified reviews</span>
            <span className="bg-[#e6f4f1] text-[#0f5247] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              {currentProduct.positivePct}% Positive
            </span>
          </div>

          {/* REVIEWS.io Attribute Breakdown Sliders */}
          <div className="grid grid-cols-2 gap-4 pt-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-800 text-[11px] mb-1">
                <span>Quality</span>
                <span className="text-[#135f52]">Excellent</span>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-800 font-bold">
                <span>Poor</span>
                <div className="flex-1 mx-2 bg-slate-200 h-1 rounded-full relative">
                  <div className="w-3 h-3 bg-[#135f52] rounded-full absolute right-1 top-1/2 -translate-y-1/2" />
                </div>
                <span>Excellent</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-800 text-[11px] mb-1">
                <span>Value for money</span>
                <span className="text-[#135f52]">Excellent</span>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-800 font-bold">
                <span>Poor</span>
                <div className="flex-1 mx-2 bg-slate-200 h-1 rounded-full relative">
                  <div className="w-3 h-3 bg-[#135f52] rounded-full absolute right-2 top-1/2 -translate-y-1/2" />
                </div>
                <span>Excellent</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center items-center gap-1.5 pt-2">
        {products.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-[#135f52]' : 'w-2 bg-slate-300'}`}
          />
        ))}
      </div>

    </div>
  );
};

