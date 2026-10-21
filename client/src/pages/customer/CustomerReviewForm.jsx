import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, CheckCircle2, Camera, ArrowRight, Upload, ThumbsUp, ThumbsDown, Package, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CustomerReviewForm = () => {
  const [searchParams] = useSearchParams();
  const { token: routeToken } = useParams();
  const token = searchParams.get('token') || routeToken;
  const orderIdParam = searchParams.get('orderId');
  const emailParam = searchParams.get('email');
  const nameParam = searchParams.get('name') || searchParams.get('customerName');
  const productIdParam = searchParams.get('productId');
  
  const { business, products, invitations, submitReview } = useData();
  const navigate = useNavigate();

  // If token is found in invitations, auto-populate details
  const matchedInvite = invitations?.find(i => i.token === token);

  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [customerName, setCustomerName] = useState(nameParam || matchedInvite?.customerName || '');
  const [customerEmail, setCustomerEmail] = useState(emailParam || matchedInvite?.customerEmail || '');
  const [customerCity, setCustomerCity] = useState('');
  const [orderId, setOrderId] = useState(orderIdParam || matchedInvite?.orderId || '');
  const [selectedProductId, setSelectedProductId] = useState(productIdParam || matchedInvite?.productId || (products[0]?.id || ''));
  const [recommend, setRecommend] = useState('yes');

  useEffect(() => {
    if (matchedInvite) {
      if (!customerName && matchedInvite.customerName) setCustomerName(matchedInvite.customerName);
      if (!customerEmail && matchedInvite.customerEmail) setCustomerEmail(matchedInvite.customerEmail);
      if (!orderId && matchedInvite.orderId) setOrderId(matchedInvite.orderId);
      if (matchedInvite.productId) setSelectedProductId(matchedInvite.productId);
    }
  }, [matchedInvite]);
  
  // "What did you like?" checkboxes
  const [likedFeatures, setLikedFeatures] = useState(['Product Quality', 'Packaging']);
  
  // Attribute ratings (1-5)
  const [attributes, setAttributes] = useState({ quality: 5, value: 5, delivery: 5, packaging: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);

  const featureOptions = [
    'Product Quality',
    'Fast Delivery',
    'Customer Service',
    'Safe Packaging',
    'Value for Money',
    'Ease of Use'
  ];

  const toggleFeature = (feature) => {
    if (likedFeatures.includes(feature)) {
      setLikedFeatures(likedFeatures.filter(f => f !== feature));
    } else {
      setLikedFeatures([...likedFeatures, feature]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || !customerName.trim()) return;

    setSubmitting(true);
    const res = await submitReview({
      customerName,
      customerEmail,
      customerCity: customerCity || 'Bengaluru, India',
      productId: selectedProductId,
      orderId,
      invitationToken: token,
      rating,
      title: reviewTitle || `${rating} Star Review by ${customerName}`,
      reviewText: `${reviewTitle ? reviewTitle + ' - ' : ''}${reviewText}`,
      recommend: recommend === 'yes',
      likedFeatures,
      attributes
    });
    setSubmitting(false);
    setSubmittedResult(res);
  };

  if (submittedResult) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 w-full max-w-md p-8 rounded-3xl text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Review Submitted Successfully!</h2>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">{submittedResult.message || "Your authentic review has been recorded and sentiment scored by our PySpark ML Engine."}</p>

          <div className="bg-emerald-50 text-emerald-800 border border-emerald-300 p-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>✓ Verified Buyer Badge Awarded</span>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button onClick={() => navigate('/directory')} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-3 rounded-xl transition shadow-lg">
              Explore Verified Indian Directory
            </button>
            <button onClick={() => navigate('/')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl border border-slate-300 transition">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white border border-slate-200 w-full max-w-2xl p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center font-extrabold mx-auto shadow-lg shadow-teal-500/20">
            <Star className="w-6 h-6 fill-slate-950 text-slate-950" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Share Your Experience with {business?.name || 'Our Store'}
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your authentic review helps fellow Indian shoppers and empowers local businesses to deliver exceptional quality.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {/* Star Rating Select */}
          <div className="text-center bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <label className="text-slate-800 font-bold block text-sm">Overall Star Rating</label>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setRating(s)}
                  className={`text-4xl transition transform hover:scale-125 ${s <= rating ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-slate-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <span className="text-[11px] text-teal-600 font-bold block">
              {rating === 5 ? '⭐⭐⭐⭐⭐ Exceptional (5.0)' : rating === 4 ? '⭐⭐⭐⭐ Very Good (4.0)' : rating === 3 ? '⭐⭐⭐ Average (3.0)' : '⭐ Needs Improvement'}
            </span>
          </div>

          {/* Product Selection */}
          <div>
            <label className="block text-slate-800 font-bold mb-1.5 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-teal-600" /> Select Product (or Overall Company Review)
            </label>
            <select
              value={selectedProductId}
              onChange={e => setSelectedProductId(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none font-medium"
            >
              <option value="">🏢 Entire Store / Company Experience ({business?.name || 'General Experience'})</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  📦 {p.name} (₹{p.price})
                </option>
              ))}
            </select>
          </div>

          {/* Customer Personal Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Your Full Name *</label>
              <input 
                type="text" 
                required 
                value={customerName} 
                onChange={e => setCustomerName(e.target.value)} 
                placeholder="e.g. Rahul Verma" 
                className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Email Address *</label>
              <input 
                type="email" 
                required 
                value={customerEmail} 
                onChange={e => setCustomerEmail(e.target.value)} 
                placeholder="rahul.verma@example.in" 
                className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1 font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-teal-600" /> City / State
              </label>
              <input 
                type="text" 
                value={customerCity} 
                onChange={e => setCustomerCity(e.target.value)} 
                placeholder="e.g. Bengaluru, Karnataka" 
                className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none" 
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 mb-1 font-semibold">Order ID (Auto-Verifies Verified Buyer Badge):</label>
            <input 
              type="text" 
              value={orderId} 
              onChange={e => setOrderId(e.target.value)} 
              placeholder="e.g. ORD-7014" 
              className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:border-teal-500 focus:outline-none" 
            />
          </div>

          {/* Review Title & Body */}
          <div className="space-y-3">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Review Headline / Title</label>
              <input 
                type="text" 
                value={reviewTitle} 
                onChange={e => setReviewTitle(e.target.value)} 
                placeholder="e.g. Outstanding quality & super fast express delivery!" 
                className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none" 
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Detailed Review *</label>
              <textarea 
                rows={4}
                required
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="What did you like or dislike? How does it fit your daily needs? Give genuine details..."
                className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-xs" 
              />
            </div>
          </div>

          {/* "What did you like?" Checkboxes */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
            <span className="font-bold text-slate-800 block text-xs">What did you like most?</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {featureOptions.map(f => {
                const checked = likedFeatures.includes(f);
                return (
                  <button
                    type="button"
                    key={f}
                    onClick={() => toggleFeature(f)}
                    className={`text-left p-2.5 rounded-xl border transition flex items-center gap-2 text-xs font-medium ${
                      checked 
                        ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold' 
                        : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${checked ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'}`}>
                      {checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span>{f}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Attribute Sliders */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="font-bold text-slate-800 block text-xs">Detailed Attribute Ratings</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'quality', label: 'Build / Fabric Quality' },
                { key: 'value', label: 'Value for Money' },
                { key: 'delivery', label: 'Delivery Speed' },
                { key: 'packaging', label: 'Packaging Care' }
              ].map(attr => (
                <div key={attr.key} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">{attr.label}</span>
                    <span className="text-teal-600 font-bold">{attributes[attr.key]} / 5</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={attributes[attr.key]} 
                    onChange={e => setAttributes({...attributes, [attr.key]: Number(e.target.value)})}
                    className="w-full accent-teal-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-800 text-xs">Would you recommend this to a friend?</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRecommend('yes')}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                  recommend === 'yes' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" /> Yes
              </button>
              <button
                type="button"
                onClick={() => setRecommend('no')}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                  recommend === 'no' ? 'bg-rose-600 text-white border-rose-500' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" /> No
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <button 
            type="submit"
            disabled={submitting}
            className="w-full bg-teal-600 hover:bg-teal-500 text-slate-900 font-extrabold py-3.5 rounded-2xl transition shadow-xl text-sm flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            {submitting ? "Submitting Authentic Review..." : "Submit Review & Verify Badge"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};

