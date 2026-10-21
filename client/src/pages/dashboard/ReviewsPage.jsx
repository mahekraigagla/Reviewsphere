import React, { useState } from 'react';
import { 
  MessageSquare, Star, ShieldCheck, Filter, Search, Reply, Flag, 
  CheckCircle2, X, ThumbsUp, ThumbsDown, Camera, AlertTriangle, 
  Sparkles, ExternalLink 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export const ReviewsPage = () => {
  const { reviews, replyToReview, loading, business, seedDemoData } = useData();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Loading Review Timeline...</div>;

  let filtered = [...reviews];

  if (filter === 'needsResponse') {
    filtered = filtered.filter(r => !r.response);
  } else if (filter === 'verified') {
    filtered = filtered.filter(r => r.verified);
  } else if (filter === 'positive') {
    filtered = filtered.filter(r => r.sentiment === 'Positive');
  } else if (filter === 'negative') {
    filtered = filtered.filter(r => r.sentiment === 'Negative');
  } else if (filter === 'product') {
    filtered = filtered.filter(r => r.reviewType === 'Product');
  } else if (filter === 'company') {
    filtered = filtered.filter(r => r.reviewType === 'Company');
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(r => 
      r.customerName.toLowerCase().includes(s) || 
      r.reviewText.toLowerCase().includes(s) ||
      (r.productName && r.productName.toLowerCase().includes(s)) ||
      (r.orderId && r.orderId.toLowerCase().includes(s))
    );
  }

  const handleSendReply = async () => {
    if (!selectedReview || !replyText.trim()) return;
    setIsSubmittingReply(true);
    await replyToReview(selectedReview.id, replyText);
    setIsSubmittingReply(false);
    setReplyText('');
    setSelectedReview(null);
  };

  const handleLoadDemo = async () => {
    setLoadingDemo(true);
    await seedDemoData();
    setLoadingDemo(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Review Timeline & Inbox</h1>
            <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-0.5 rounded-full border border-teal-200">
              {business?.name || 'Verified Business'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Manage, moderate, inspect, and reply to verified customer feedback in real-time.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/review/submit"
            target="_blank"
            className="flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl border border-slate-300 transition shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-600" /> Customer Review Link
          </Link>

          <div className="flex items-center gap-2 bg-teal-50 px-3.5 py-2 rounded-xl border border-teal-200 text-xs font-semibold">
            <span className="text-teal-900">Total Reviews:</span>
            <span className="text-teal-700 font-extrabold">{reviews.length}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by customer, product, keyword, order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-teal-500 transition font-medium"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold w-full md:w-auto">
          {[
            { key: 'all', label: 'All Reviews' },
            { key: 'needsResponse', label: 'Needs Response' },
            { key: 'verified', label: '✓ Verified Buyer' },
            { key: 'positive', label: 'Positive' },
            { key: 'negative', label: 'Negative' },
            { key: 'product', label: 'Product Reviews' },
            { key: 'company', label: 'Company Reviews' }
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-xl transition ${
                filter === f.key 
                  ? 'bg-teal-600 text-white font-bold shadow-sm' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

      </div>

      {/* Reviews List Timeline or Empty State */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-100">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                {reviews.length === 0 ? "No Reviews Collected Yet" : "No Reviews Matched Your Filter"}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                {reviews.length === 0 
                  ? `Your business has a clean inbox. Send customer review invitations or share your review form link to start collecting authentic verified buyer reviews.`
                  : "Try clearing your search query or selecting 'All Reviews' to see all feedback."}
              </p>
            </div>
            
            <div className="flex justify-center items-center gap-3 pt-2">
              <Link 
                to="/review/submit"
                target="_blank"
                className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" /> Open Review Form
              </Link>
              {reviews.length === 0 && (
                <button 
                  onClick={handleLoadDemo} 
                  disabled={loadingDemo}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {loadingDemo ? "Loading..." : "Load Demo Reviews"}
                </button>
              )}
            </div>
          </div>
        ) : (
          filtered.map(r => (
            <div 
              key={r.id} 
              className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 hover:border-slate-300 transition shadow-sm"
            >
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 font-extrabold flex items-center justify-center text-sm border border-teal-100">
                    {r.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{r.customerName}</span>
                      {r.verified && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Verified Buyer
                        </span>
                      )}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        r.sentiment === 'Positive' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        r.sentiment === 'Negative' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {r.sentiment}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {r.customerLocation} • {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-amber-400 text-base font-extrabold">{'★'.repeat(r.rating)}</div>
                  <span className="text-xs text-slate-500 font-bold">({r.rating}/5)</span>
                </div>
              </div>

              {/* Product Context */}
              {r.productName && (
                <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-700 text-xs px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-medium">Product:</span>
                  <span className="font-bold text-slate-900">{r.productName}</span>
                  {r.orderId && <span className="text-slate-400 text-[10px] font-mono">({r.orderId})</span>}
                </div>
              )}

              {/* Review Body */}
              <p className="text-slate-800 text-sm leading-relaxed">{r.reviewText}</p>

              {/* Photos if present */}
              {r.photos && r.photos.length > 0 && (
                <div className="flex gap-2 pt-1">
                  {r.photos.map((photo, i) => (
                    <img key={i} src={photo} alt="Customer upload" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                  ))}
                </div>
              )}

              {/* Business Response if existing */}
              {r.response && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center gap-2 text-teal-700 font-bold">
                    <Reply className="w-3.5 h-3.5" /> Official Business Reply
                  </div>
                  <p className="text-slate-700 italic">"{r.response.responseText}"</p>
                  <div className="text-[10px] text-slate-400 text-right">{new Date(r.response.createdAt).toLocaleDateString()}</div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  {!r.response && (
                    <button 
                      onClick={() => setSelectedReview(r)}
                      className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Reply className="w-3.5 h-3.5" /> Reply to Customer
                    </button>
                  )}
                </div>

                <div className="text-slate-400 text-[11px]">
                  ID: <code className="text-slate-500 font-mono">{r.id}</code>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Reply className="w-4 h-4 text-teal-600" /> Reply to {selectedReview.customerName}
              </h3>
              <button onClick={() => setSelectedReview(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
              <div className="text-amber-400 font-bold">{'★'.repeat(selectedReview.rating)}</div>
              <p className="text-slate-700 italic line-clamp-3">"{selectedReview.reviewText}"</p>
            </div>

            <div>
              <label className="block text-xs text-slate-700 font-bold mb-1.5">Your Official Public Response</label>
              <textarea 
                rows="4"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Thank the customer, address their points, and reaffirm your dedication to quality..."
                className="w-full bg-slate-50 text-slate-900 p-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:outline-none text-xs leading-relaxed font-medium"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendReply}
                disabled={isSubmittingReply || !replyText.trim()}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-md disabled:opacity-50"
              >
                {isSubmittingReply ? "Posting..." : "Publish Official Reply"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
