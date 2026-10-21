import React, { useState } from 'react';
import { Send, Plus, UploadCloud, CheckCircle2, MessageSquare, Mail, Smartphone, ArrowRight, Copy, Check, Clock, Sparkles, Globe, QrCode, Code, Star, ExternalLink, ShieldCheck, UserCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const RequestReviewPage = () => {
  const { products, requestReview, submitReview, invitations, loading, business } = useData();

  const [activeTab, setActiveTab] = useState('universal'); // 'universal', 'manual', 'direct', 'bulk', 'auto'
  
  // Custom Public Base URL for worldwide deployment
  const [customBaseUrl, setCustomBaseUrl] = useState('');
  const effectivePublicUrl = customBaseUrl || business?.publicBaseUrl || window.location.origin;
  const universalFormUrl = `${effectivePublicUrl.replace(/\/$/, '')}/feedback`;

  // Manual Request Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+91 ');
  const [productId, setProductId] = useState(products[0]?.id || '');
  const [orderId, setOrderId] = useState(`ORD-IND-${Math.floor(1000 + Math.random() * 9000)}`);
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().split('T')[0]);
  const [reviewType, setReviewType] = useState('Both');
  const [channel, setChannel] = useState('Both');

  const [submitting, setSubmitting] = useState(false);
  const [createdInvite, setCreatedInvite] = useState(null);
  const [copiedLink, setCopiedLink] = useState('');

  // Direct Review Collection State (In-person / Phone / Walk-in)
  const [directRating, setDirectRating] = useState(5);
  const [directName, setDirectName] = useState('');
  const [directEmail, setDirectEmail] = useState('');
  const [directProductId, setDirectProductId] = useState(products[0]?.id || '');
  const [directReviewText, setDirectReviewText] = useState('');
  const [directSubmitting, setDirectSubmitting] = useState(false);
  const [directSuccess, setDirectSuccess] = useState(false);

  // Auto rules state
  const [autoRuleEnabled, setAutoRuleEnabled] = useState(true);
  const [delayDays, setDelayDays] = useState(3);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(key);
    setTimeout(() => setCopiedLink(''), 2500);
  };

  const handleSubmitManual = async (e) => {
    e.preventDefault();
    if (!customerName || !customerEmail) return;

    setSubmitting(true);
    const res = await requestReview({
      customerName,
      customerEmail,
      customerPhone,
      productId: productId || (products[0] ? products[0].id : null),
      orderId,
      orderDate,
      deliveryDate,
      reviewType,
      channel,
      publicBaseUrl: effectivePublicUrl
    });
    setSubmitting(false);

    if (res.success) {
      setCreatedInvite(res.invitation);
      if (channel === 'WhatsApp' && res.whatsappUrl) {
        window.open(res.whatsappUrl, '_blank');
      } else if (channel === 'Email' && res.mailtoUrl) {
        window.location.href = res.mailtoUrl;
      }
    }
  };

  const handleSubmitDirect = async (e) => {
    e.preventDefault();
    if (!directName || !directReviewText) return;

    setDirectSubmitting(true);
    const res = await submitReview({
      customerName: directName,
      customerEmail: directEmail || 'walkin.customer@verified.in',
      productId: directProductId,
      rating: directRating,
      reviewText: directReviewText,
      recommend: directRating >= 4,
      likedFeatures: ['Product Quality', 'Store Service'],
      attributes: { quality: directRating, service: directRating }
    });
    setDirectSubmitting(false);

    if (res && res.success) {
      setDirectSuccess(true);
      setDirectName('');
      setDirectEmail('');
      setDirectReviewText('');
      setTimeout(() => setDirectSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Review Collection & Invitations</h1>
          <p className="text-xs text-slate-400 mt-1">
            Collect authentic customer reviews worldwide via Public Website Form, WhatsApp, Email, QR Codes & In-Person entries.
          </p>
        </div>

        {/* Global Public Domain Indicator */}
        <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-teal-500/30 flex items-center gap-3 shadow-lg">
          <Globe className="w-4 h-4 text-teal-400 flex-shrink-0 animate-pulse" />
          <div className="text-[11px]">
            <span className="text-slate-400 block font-medium">Worldwide Production Domain:</span>
            <span className="text-emerald-400 font-mono font-bold">{effectivePublicUrl}</span>
          </div>
        </div>
      </div>

      {/* Worldwide Public URL Quick Switcher */}
      <div className="bg-white/80 p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Globe className="w-4 h-4 text-teal-400" />
          <span className="font-semibold text-slate-900">Target Public Host:</span>
          <input 
            type="text" 
            placeholder={business?.publicBaseUrl || window.location.origin}
            value={customBaseUrl} 
            onChange={e => setCustomBaseUrl(e.target.value)} 
            className="bg-slate-50 text-emerald-400 font-mono text-xs px-3 py-1.5 rounded-xl border border-slate-700 w-64 focus:outline-none focus:border-teal-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={() => setCustomBaseUrl(window.location.origin)}
            className="bg-slate-200 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 font-medium text-[11px]"
          >
            Auto Host
          </button>
          <button 
            type="button" 
            onClick={() => setCustomBaseUrl('https://reviewsphere.vercel.app')}
            className="bg-teal-950/60 hover:bg-teal-900 text-teal-300 px-2.5 py-1 rounded-lg border border-teal-800 font-medium text-[11px]"
          >
            🌍 Vercel Production
          </button>
        </div>
      </div>

      {/* 5 Review Collection Channels Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        
        {/* Option 1: Universal Public Form Link */}
        <button
          onClick={() => { setActiveTab('universal'); setCreatedInvite(null); }}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'universal'
              ? 'bg-[#135f52] text-slate-900 border-teal-500 shadow-xl shadow-teal-950/40'
              : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">Method 1</span>
            <Globe className="w-4 h-4 text-teal-300" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">Public Form Link ⭐</h3>
          <p className="text-[11px] opacity-80 mt-1">Universal landing form link for Vercel, Bio & WhatsApp.</p>
        </button>

        {/* Option 2: Personalized Request (WhatsApp/Email) */}
        <button
          onClick={() => { setActiveTab('manual'); setCreatedInvite(null); }}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'manual'
              ? 'bg-[#135f52] text-slate-900 border-teal-500 shadow-xl shadow-teal-950/40'
              : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">Method 2</span>
            <Send className="w-4 h-4 text-teal-300" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">Auto WhatsApp / Email</h3>
          <p className="text-[11px] opacity-80 mt-1">1-on-1 verified invitation with Order ID tracking.</p>
        </button>

        {/* Option 3: Direct In-Person Entry */}
        <button
          onClick={() => { setActiveTab('direct'); setCreatedInvite(null); }}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'direct'
              ? 'bg-[#135f52] text-slate-900 border-teal-500 shadow-xl shadow-teal-950/40'
              : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">Method 3</span>
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">In-Person Review</h3>
          <p className="text-[11px] opacity-80 mt-1">Collect walk-in / phone reviews directly on the spot.</p>
        </button>

        {/* Option 4: Bulk CSV Upload */}
        <button
          onClick={() => { setActiveTab('bulk'); setCreatedInvite(null); }}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'bulk'
              ? 'bg-[#135f52] text-slate-900 border-teal-500 shadow-xl shadow-teal-950/40'
              : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">Method 4</span>
            <UploadCloud className="w-4 h-4 text-teal-300" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">Bulk CSV Upload</h3>
          <p className="text-[11px] opacity-80 mt-1">Upload hundreds of customers from CSV spreadsheet.</p>
        </button>

        {/* Option 5: Automatic Rules */}
        <button
          onClick={() => { setActiveTab('auto'); setCreatedInvite(null); }}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'auto'
              ? 'bg-[#135f52] text-slate-900 border-teal-500 shadow-xl shadow-teal-950/40'
              : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">Method 5</span>
            <Clock className="w-4 h-4 text-teal-300" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">Auto Rules</h3>
          <p className="text-[11px] opacity-80 mt-1">Auto-send 3 days after courier delivery.</p>
        </button>
      </div>

      {/* METHOD 1: Universal Public Form Link (Website / Vercel / Bio) */}
      {activeTab === 'universal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-teal-500/40 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-teal-500/30">
                Universal Feedback Landing Page
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">Shareable Public Customer Review Link</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When published on Vercel or your website, customers can tap this link from anywhere in the world, rate products, and submit feedback that immediately reflects in your database & analytics.
              </p>
            </div>

            {/* Universal Link Box */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Your Universal Review Form URL:</label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={universalFormUrl} 
                  className="w-full bg-slate-50 text-emerald-400 font-mono text-xs p-3 rounded-xl border border-slate-200 select-all"
                />
                <button
                  onClick={() => copyToClipboard(universalFormUrl, 'universal')}
                  className="bg-teal-600 hover:bg-teal-500 text-slate-900 p-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition flex-shrink-0"
                >
                  {copiedLink === 'universal' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink === 'universal' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* 1-Click Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={universalFormUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-teal-600 hover:bg-teal-500 text-slate-900 font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-teal-950/40"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Form (Live Test in Tab)</span>
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Hi! We value your feedback for ${business?.name || 'our store'}. Please take 30 seconds to share your review on our form: ${universalFormUrl}`)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950/40"
              >
                <Smartphone className="w-4 h-4" />
                <span>Share Form via WhatsApp</span>
              </a>
            </div>

            {/* Iframe Embed Option for Existing Websites */}
            <div className="bg-white/90 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                  <Code className="w-4 h-4 text-teal-400" />
                  <span>Embed Review Form on Your Existing Website:</span>
                </div>
                <button
                  onClick={() => copyToClipboard(`<iframe src="${universalFormUrl}" width="100%" height="650" frameborder="0"></iframe>`, 'embed')}
                  className="text-[11px] text-teal-400 hover:underline font-bold"
                >
                  {copiedLink === 'embed' ? 'Copied Embed Code!' : 'Copy HTML'}
                </button>
              </div>
              <pre className="bg-slate-50 text-slate-800 text-[11px] font-mono p-3 rounded-xl border border-slate-200 overflow-x-auto">
                {`<iframe src="${universalFormUrl}" width="100%" height="650" frameborder="0"></iframe>`}
              </pre>
            </div>

          </div>

          {/* QR Code & Poster Card */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xl text-center">
            <h4 className="text-xs font-extrabold uppercase text-slate-900 tracking-wider">
              📱 Universal QR Code for Invoices & Counter
            </h4>
            <p className="text-[11px] text-slate-700 font-medium">
              Customers scan with their phone camera to open the review form directly on their mobile browser.
            </p>

            <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-xl border border-slate-100">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(universalFormUrl)}`} 
                alt="Universal Review QR Code" 
                className="w-44 h-44"
              />
            </div>

            <div className="text-[11px] text-slate-700 space-y-1">
              <div className="font-bold text-slate-900">Target Link Encoded in QR:</div>
              <div className="font-mono text-teal-800 break-all text-[10px] font-semibold">{universalFormUrl}</div>
            </div>

            <button
              onClick={() => copyToClipboard(universalFormUrl, 'qr')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs py-2.5 rounded-xl border border-slate-300 transition shadow-sm"
            >
              {copiedLink === 'qr' ? 'Copied QR Link!' : 'Copy Link for QR Printing'}
            </button>
          </div>

        </div>
      )}

      {/* METHOD 2: Manual Individual Request (WhatsApp / Email) */}
      {activeTab === 'manual' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <form onSubmit={handleSubmitManual} className="lg:col-span-7 bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xl text-xs">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-3">
              Request Customer Review (1-on-1 Personalized Invite)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Customer Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={customerName} 
                  onChange={e => setCustomerName(e.target.value)} 
                  placeholder="Rahul Sharma"
                  className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Customer Email *</label>
                <input 
                  type="email" 
                  required 
                  value={customerEmail} 
                  onChange={e => setCustomerEmail(e.target.value)} 
                  placeholder="rahul@example.in"
                  className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-bold mb-1">WhatsApp Number (with Country Code) *</label>
                <input 
                  type="text" 
                  required
                  value={customerPhone} 
                  onChange={e => setCustomerPhone(e.target.value)} 
                  placeholder="+91 9820012345"
                  className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Select Product</label>
                <select 
                  value={productId} 
                  onChange={e => setProductId(e.target.value)}
                  className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 font-medium"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (₹{p.price})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Order ID</label>
                <input 
                  type="text" 
                  value={orderId} 
                  onChange={e => setOrderId(e.target.value)} 
                  className="w-full bg-white text-teal-400 font-mono p-3 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Review Type</label>
                <select 
                  value={reviewType} 
                  onChange={e => setReviewType(e.target.value)}
                  className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 font-semibold"
                >
                  <option value="Both">Company + Product Review</option>
                  <option value="Company">Company Only</option>
                  <option value="Product">Product Only</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Preferred Channel</label>
                <select 
                  value={channel} 
                  onChange={e => setChannel(e.target.value)}
                  className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 font-semibold"
                >
                  <option value="Both">WhatsApp + Email (Recommended)</option>
                  <option value="WhatsApp">WhatsApp Only</option>
                  <option value="Email">Email Only</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-[#135f52] hover:bg-[#0d453b] text-slate-900 font-extrabold text-sm py-4 rounded-xl transition shadow-xl shadow-teal-950/40 flex items-center justify-center gap-2"
            >
              {submitting ? "Generating & Sending..." : "Send Personalized Review Request"} <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Invitation Previews & Live Dispatch Actions */}
          <div className="lg:col-span-5 space-y-4">
            
            {createdInvite ? (
              <div className="bg-slate-50 p-6 rounded-3xl border border-teal-500/50 space-y-4 shadow-2xl animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Review Invitation Ready for {createdInvite.customerName}!</span>
                </div>

                {/* Real 1-Click Action Triggers */}
                {(() => {
                  const resolvedReviewUrl = (createdInvite.reviewUrl || '').includes('localhost:3000')
                    ? createdInvite.reviewUrl.replace('http://localhost:3000', window.location.origin)
                    : createdInvite.reviewUrl;
                  const resolvedWhatsappUrl = (createdInvite.whatsappUrl || '').includes('localhost:3000')
                    ? createdInvite.whatsappUrl.replaceAll('http://localhost:3000', window.location.origin).replaceAll('http%3A%2F%2Flocalhost%3A3000', encodeURIComponent(window.location.origin))
                    : createdInvite.whatsappUrl;
                  return (
                    <div className="space-y-2 pt-1">
                      <span className="font-bold text-slate-300 text-xs block">Click to Dispatch to Customer Right Now:</span>
                      
                      {/* WhatsApp Action */}
                      <a
                        href={resolvedWhatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-between transition shadow-lg shadow-emerald-950/40"
                      >
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          <span>Send via WhatsApp (+{createdInvite.cleanPhone || createdInvite.customerPhone})</span>
                        </div>
                        <span className="bg-emerald-700 text-slate-900 text-[10px] uppercase font-black px-2 py-0.5 rounded">Open App ↗</span>
                      </a>

                  {/* Gmail Web Action */}
                  <a
                    href={createdInvite.gmailUrl || `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(createdInvite.customerEmail)}&su=${encodeURIComponent(`Review your order from Zaptor Electronics`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-rose-600 hover:bg-rose-500 text-slate-900 font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-between transition shadow-lg shadow-rose-950/40"
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>Send via Gmail Web ({createdInvite.customerEmail})</span>
                    </div>
                    <span className="bg-rose-700 text-slate-900 text-[10px] uppercase font-black px-2 py-0.5 rounded">Open Gmail ↗</span>
                  </a>
                </div>
              );
            })()}

                {/* Direct Customer Review Form Opener */}
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <a 
                    href={(createdInvite.reviewUrl || '').includes('localhost:3000') ? createdInvite.reviewUrl.replace('http://localhost:3000', window.location.origin) : createdInvite.reviewUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full bg-teal-600 hover:bg-teal-500 text-slate-900 font-extrabold text-xs py-3 rounded-xl text-center block transition shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>🚀 Open Customer Review Form (Instant Test)</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  {/* Mobile QR Code */}
                  {createdInvite.qrCodeUrl && (
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                      <img src={createdInvite.qrCodeUrl} alt="Review QR Code" className="w-16 h-16 rounded-lg bg-white p-1" />
                      <div className="text-[11px] text-slate-300">
                        <strong className="text-slate-900 block">Scan QR on Mobile Phone</strong>
                        <span>Point your mobile camera to test on your phone instantly.</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* WhatsApp Message Preview */}
                <div className="bg-[#0b141a] text-slate-900 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-[11px]">
                    <Smartphone className="w-4 h-4" /> WhatsApp Text Message Preview
                  </div>
                  <div className="bg-[#202c33] p-3 rounded-xl space-y-2 text-slate-200">
                    <p className="whitespace-pre-wrap leading-relaxed font-sans">{createdInvite.whatsappMessagePreview}</p>
                    <div className="text-[10px] text-slate-400 text-right">Just now • Ready to send ✓✓</div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xl">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                  Automated Dispatch Previews
                </h4>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs text-slate-400 space-y-2">
                  <div className="flex items-center gap-2 text-teal-400 font-bold">
                    <Sparkles className="w-4 h-4" /> Live Invitation Workflow
                  </div>
                  <div className="text-slate-300 leading-relaxed text-[11px] space-y-1">
                    <div>1. Enter the customer's real name, email, and WhatsApp number.</div>
                    <div>2. Click <strong>Send Review Request</strong>.</div>
                    <div>3. Click <strong>"Send via WhatsApp"</strong> or <strong>"Send via Gmail"</strong> to launch the invitation directly.</div>
                    <div>4. When the customer submits their rating, it is instantly verified and appears in your <strong>Reviews Inbox</strong> and <strong>Analytics</strong>!</div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* METHOD 3: Direct In-Person Review Entry */}
      {activeTab === 'direct' && (
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 max-w-3xl mx-auto space-y-6 shadow-2xl">
          <div>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-amber-500/30">
              Counter / Walk-in / Phone Collection
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">Record In-Person Customer Review</h3>
            <p className="text-xs text-slate-400 mt-1">
              Add feedback directly from a walk-in buyer, store customer, or phone call. Saves directly into your database & sentiment engine immediately.
            </p>
          </div>

          {directSuccess && (
            <div className="bg-emerald-950/80 text-emerald-300 border border-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Review recorded successfully! Database, sentiment scores, and analytics updated in real-time.</span>
            </div>
          )}

          <form onSubmit={handleSubmitDirect} className="space-y-4 text-xs">
            {/* Star Rating Select */}
            <div className="text-center bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5">
              <label className="text-slate-300 font-bold block text-xs">Star Rating</label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setDirectRating(s)}
                    className={`text-3xl transition ${s <= directRating ? 'text-amber-400' : 'text-slate-700'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Customer Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={directName} 
                  onChange={e => setDirectName(e.target.value)} 
                  placeholder="e.g. Anand Kumar" 
                  className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Email / Phone (Optional)</label>
                <input 
                  type="text" 
                  value={directEmail} 
                  onChange={e => setDirectEmail(e.target.value)} 
                  placeholder="anand@example.in or +91 9876543210" 
                  className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Reviewed Product / Store</label>
              <select 
                value={directProductId} 
                onChange={e => setDirectProductId(e.target.value)}
                className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
              >
                <option value="">🏢 Entire Store / Company Experience</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>📦 {p.name} (₹{p.price})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Customer Feedback / Comments *</label>
              <textarea 
                rows={3} 
                required 
                value={directReviewText} 
                onChange={e => setDirectReviewText(e.target.value)} 
                placeholder="Write what the customer shared about the product quality, service, or delivery..."
                className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
              />
            </div>

            <button 
              type="submit" 
              disabled={directSubmitting}
              className="w-full bg-[#135f52] hover:bg-[#0d453b] text-slate-900 font-extrabold text-xs py-3.5 rounded-xl transition shadow-xl flex items-center justify-center gap-2"
            >
              {directSubmitting ? "Recording..." : "Save Review to Database Immediately"} <Check className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* METHOD 4: Bulk CSV Upload */}
      {activeTab === 'bulk' && (
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6 shadow-xl max-w-2xl mx-auto">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Bulk Customer & Order Import</h3>
            <p className="text-xs text-slate-400 mt-1">Upload CSV file to send automated review invitations to hundreds of buyers in bulk.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 font-mono text-xs text-teal-300 space-y-1">
            <div className="font-bold text-slate-400 mb-1 font-sans">CSV Format:</div>
            <div>customer_name,email,phone,order_id,product,delivery_date</div>
            <div>Rahul Sharma,rahul@example.in,+91 9820012345,ORD-701,Boat Rockerz,2026-09-07</div>
            <div>Priya Patel,priya@example.in,+91 9820012346,ORD-702,Noise Watch,2026-09-07</div>
          </div>

          <button className="bg-[#135f52] hover:bg-[#0d453b] text-slate-900 font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2">
            <UploadCloud className="w-4 h-4" /> Upload & Dispatch Bulk Review Invites
          </button>
        </div>
      )}

      {/* METHOD 5: Automatic Review Requests Rule */}
      {activeTab === 'auto' && (
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6 shadow-xl max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Automatic Review Request Automation</h3>
              <p className="text-xs text-slate-400 mt-1">Set rule once and ReviewSphere dispatches review requests automatically upon courier delivery.</p>
            </div>
            <button 
              onClick={() => setAutoRuleEnabled(!autoRuleEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${autoRuleEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
            >
              <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${autoRuleEnabled ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs space-y-3">
            <div className="flex justify-between items-center text-slate-300 font-bold">
              <span>Timing: Send invitation</span>
              <span className="text-teal-400">{delayDays} days after order delivery</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="7" 
              value={delayDays} 
              onChange={e => setDelayDays(Number(e.target.value))}
              className="w-full accent-teal-500" 
            />
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Automatic WhatsApp + Email triggers are active.</span>
          </div>
        </div>
      )}

      {/* Real Review Invitations History & Action Log */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Send className="w-4 h-4 text-teal-400" /> Review Invitations Dispatch Log
            </h3>
            <p className="text-[11px] text-slate-400">Track all customer review invitations, click to launch WhatsApp/Email, or view customer review submissions.</p>
          </div>
          <span className="text-[10px] text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20 font-bold">
            {invitations?.length || 0} Invitations Dispatched
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] bg-white/50">
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3">Product / Order</th>
                <th className="py-3 px-3">Channel</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {invitations && invitations.length > 0 ? (
                invitations.map(inv => {
                  const resolvedReviewUrl = (inv.reviewUrl || '').includes('localhost:3000')
                    ? (inv.reviewUrl || '').replace('http://localhost:3000', window.location.origin)
                    : (inv.reviewUrl || `${window.location.origin}/review/submit?token=${inv.token}`);
                  const resolvedWhatsappUrl = (inv.whatsappUrl || '').includes('localhost:3000')
                    ? (inv.whatsappUrl || '').replaceAll('http://localhost:3000', window.location.origin).replaceAll('http%3A%2F%2Flocalhost%3A3000', encodeURIComponent(window.location.origin))
                    : (inv.whatsappUrl || `https://api.whatsapp.com/send?phone=${(inv.customerPhone||'').replace(/[^0-9]/g,'')}&text=${encodeURIComponent(`Hi ${inv.customerName}! Please share your review for ${inv.productName}: ${resolvedReviewUrl}`)}`);
                  const whatsappLink = resolvedWhatsappUrl;
                  const mailtoLink = (inv.mailtoUrl || '').includes('localhost:3000')
                    ? (inv.mailtoUrl || '').replace('http://localhost:3000', window.location.origin)
                    : (inv.mailtoUrl || `mailto:${inv.customerEmail}?subject=${encodeURIComponent(`Review Request: ${inv.productName}`)}&body=${encodeURIComponent(`Hi ${inv.customerName},\n\nPlease submit your review: ${resolvedReviewUrl}`)}`);
                  const gmailLink = (inv.gmailUrl || '').includes('localhost:3000')
                    ? (inv.gmailUrl || '').replace('http://localhost:3000', window.location.origin)
                    : (inv.gmailUrl || `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(inv.customerEmail)}&su=${encodeURIComponent(`Review your order from ${business?.name || 'ReviewSphere'} (${inv.orderId})`)}&body=${encodeURIComponent(`Hi ${inv.customerName},\n\nPlease submit your review: ${resolvedReviewUrl}`)}`);

                  return (
                    <tr key={inv.id} className="hover:bg-white/40 transition">
                      <td className="py-3 px-3 font-bold text-slate-900">
                        <div>{inv.customerName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{inv.id}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        <div className="flex items-center gap-1"><Mail className="w-3 h-3 text-teal-400" /> {inv.customerEmail}</div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400"><Smartphone className="w-3 h-3 text-emerald-400" /> {inv.customerPhone}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-200">{inv.productName}</div>
                        <div className="text-[10px] text-teal-400 font-mono">{inv.orderId}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-white text-slate-300 px-2 py-0.5 rounded text-[10px] border border-slate-200">
                          {inv.channel || 'WhatsApp & Email'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 w-fit ${
                          inv.status === 'Reviewed' 
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' 
                            : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" /> {inv.status || 'Sent'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 p-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                            title="Open in WhatsApp"
                          >
                            <Smartphone className="w-3.5 h-3.5" /> WA
                          </a>
                          <a
                            href={gmailLink}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 p-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                            title="Open in Gmail"
                          >
                            <Mail className="w-3.5 h-3.5" /> Gmail
                          </a>
                          <a
                            href={inv.reviewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-teal-600/20 hover:bg-teal-600/40 text-teal-300 border border-teal-500/30 p-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                            title="Open Customer Form"
                          >
                            Form ↗
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-slate-500">
                    No review invitations dispatched yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

