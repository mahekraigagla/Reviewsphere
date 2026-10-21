import React, { useState } from 'react';
import { Code, Copy, Check, Eye, Sparkles, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const WidgetsPage = () => {
  const { widgets, business, reviews, createWidget, loading } = useData();
  const [copied, setCopied] = useState(false);
  const [widgetType, setWidgetType] = useState('Review Carousel');
  const [theme, setTheme] = useState('Light');

  if (loading || !business) return <div className="p-8 text-center text-slate-400">Loading Widgets...</div>;

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000';
  const currentEmbedCode = `<script src="${originUrl}/widget.js"></script>\n<div data-reviewsphere-widget="${widgetType.toLowerCase().replace(/\s+/g, '-')}" data-business-id="${business.id}"></div>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentEmbedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Review Widget System & Builder</h1>
        <p className="text-xs text-slate-400 mt-1">Embed live verified review carousels, rating badges, and customer cards on your website.</p>
      </div>

      {/* Widget Builder Config Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5 shadow-xl">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Customize Widget</h3>
          
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1.5">Widget Type</label>
              <select 
                value={widgetType} 
                onChange={e => setWidgetType(e.target.value)}
                className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 font-bold"
              >
                <option value="Review Carousel">Review Carousel</option>
                <option value="Rating Badge">Header Rating Badge</option>
                <option value="Product Review Widget">Product Review Widget</option>
                <option value="Testimonial Card">Testimonial Highlight</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1.5">Theme</label>
              <div className="flex gap-3">
                {['Light', 'Dark'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`flex-1 p-2.5 rounded-xl text-xs font-bold border transition ${
                      theme === t ? 'bg-teal-600 text-slate-900 border-teal-500' : 'bg-white text-slate-400 border-slate-200'
                    }`}
                  >
                    {t} Theme
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Snippet Box */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900">Generated Embed Code:</span>
              <button 
                onClick={copyToClipboard}
                className="text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <pre className="bg-white p-3 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-900 font-semibold overflow-x-auto">
              {currentEmbedCode}
            </pre>
          </div>
        </div>

        {/* Live Widget Preview */}
        <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal-400" /> Live Interactive Preview ({theme})
            </h3>
          </div>

          {/* Rendered Preview Mock */}
          <div className={`p-6 rounded-2xl border ${theme === 'Light' ? 'bg-white text-slate-900 border-slate-200' : 'bg-white text-slate-900 border-slate-200'}`}>
            {widgetType === 'Rating Badge' ? (
              <div className="inline-flex items-center gap-3 bg-slate-50 text-slate-900 px-5 py-2.5 rounded-full shadow-lg">
                <span className="text-amber-400 text-base">★★★★★</span>
                <span className="font-bold">{business.rating} / 5</span>
                <span className="text-xs text-slate-400">• {business.totalReviews} Reviews</span>
                <span className="bg-teal-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">ReviewSphere</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h4 className="font-bold text-base">Customer Reviews for {business.name}</h4>
                    <div className="text-xs text-slate-500">Rated {business.rating} ⭐ based on {business.totalReviews} reviews</div>
                  </div>
                  <span className="text-xs font-extrabold text-teal-600">ReviewSphere Verified</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reviews.slice(0, 2).map(r => (
                    <div key={r.id} className="p-4 rounded-xl border border-slate-200/80 space-y-2 bg-slate-50">
                      <div className="flex justify-between text-xs">
                        <span className="text-amber-500 font-extrabold">{'★'.repeat(r.rating)}</span>
                        {r.verified && <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">✓ Verified</span>}
                      </div>
                      <p className="text-xs text-slate-700 italic">"{r.reviewText}"</p>
                      <div className="text-xs font-bold text-slate-900">{r.customerName}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

