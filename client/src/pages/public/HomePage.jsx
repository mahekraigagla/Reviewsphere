import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, ShieldCheck, Sparkles, ArrowRight, Play, CheckCircle2, 
  Sliders, MessageSquare, BarChart3, ChevronRight, Zap, TrendingUp, Layers, Bot, ThumbsUp, Store, PackageCheck, Send, Clock
} from 'lucide-react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';

const HERO_ROTATING_ITEMS = [
  {
    productName: "Boat Rockerz 550 Over-Ear Headphone",
    category: "Electronics & Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
    rating: "4.9",
    reviewsCount: "3,561",
    reviewer: {
      name: "Payal Patel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      city: "Bengaluru, Karnataka",
      orderId: "ORD-7014",
      highlight1: "Punchy 50mm Bass",
      highlight2: "2 Days Express Delivery",
      comment: "Incredible bass response and crystal clear calls. Best audio gear for work & music!"
    }
  },
  {
    productName: "Special Indian Biryani Feast",
    category: "Food & Beverages",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=80",
    rating: "4.9",
    reviewsCount: "2,840",
    reviewer: {
      name: "Rahul Verma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      city: "Hyderabad, Telangana",
      orderId: "ORD-8921",
      highlight1: "Authentic Dum Spices",
      highlight2: "30-Min Hot Packaging",
      comment: "Aroma was mesmerizing and packaging kept it steaming hot! 5 stars."
    }
  },
  {
    productName: "Noise ColorFit Pulse 2 Smartwatch",
    category: "Electronics & Gadgets",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80",
    rating: "4.8",
    reviewsCount: "4,120",
    reviewer: {
      name: "Sneha Iyer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      city: "Chennai, Tamil Nadu",
      orderId: "ORD-4492",
      highlight1: "10-Day Battery Life",
      highlight2: "Crisp AMOLED Display",
      comment: "Battery easily lasted 10 days on a single charge. Accurate heart rate tracking."
    }
  },
  {
    productName: "Urban Streetwear Sneakers",
    category: "Fashion & Apparel",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
    rating: "4.9",
    reviewsCount: "1,980",
    reviewer: {
      name: "Vikram Malhotra",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      city: "Mumbai, Maharashtra",
      orderId: "ORD-9103",
      highlight1: "Memory Foam Cushion",
      highlight2: "Next Day Delivery",
      comment: "Fits true to Indian size standard. Extremely comfortable for daily commute."
    }
  },
  {
    productName: "Ayurvedic Herbal Immunity Booster",
    category: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80",
    rating: "5.0",
    reviewsCount: "3,110",
    reviewer: {
      name: "Ananya Joshi",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      city: "Pune, Maharashtra",
      orderId: "ORD-5321",
      highlight1: "100% Pure Ashwagandha",
      highlight2: "Eco-Friendly Pack",
      comment: "Noticeable boost in stamina within two weeks. Genuine Indian Ayurvedic quality."
    }
  }
];

export const HomePage = () => {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_ROTATING_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = HERO_ROTATING_ITEMS[heroIndex];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 font-sans">
      <PublicHeader />

      {/* Hero Section (Matching Reference Image) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-8">
              
              <div className="inline-flex items-center gap-2 bg-[#e6f4f1] text-[#0f5247] text-xs font-bold px-4 py-2 rounded-full border border-[#c3e6df] shadow-sm">
                <span>Try before you buy</span>
                <span className="text-slate-400">•</span>
                <span>100% Free Indian SaaS Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]">
                Collect reviews. <br />
                <span className="text-slate-950">
                  Get found by AI.
                </span> <br />
                <span className="text-[#135f52]">Sell more.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Build trust with every shopper across India and get in front of your future customers in AI search engines like ChatGPT, Gemini, Perplexity, and Google.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/dashboard"
                  className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 font-bold text-base px-8 py-4 rounded-xl shadow-sm transition flex items-center gap-2"
                >
                  Watch Demo
                </Link>

                <Link
                  to="/signup"
                  className="bg-[#135f52] hover:bg-[#0d453b] text-slate-900 font-bold text-base px-8 py-4 rounded-xl shadow-xl shadow-teal-900/20 transition-all hover:scale-105 flex items-center gap-2"
                >
                  Get started
                </Link>
              </div>

              {/* Ratings Badges */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-8 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">★★★★★</div>
                  <span>4.8 out of 5 rating on <strong className="text-slate-950">Shopify India</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">★★★★★</div>
                  <span>4.8 out of 5 rating on <strong className="text-slate-950">G2</strong></span>
                </div>
              </div>

              {/* Brand Logo Ticker */}
              <div className="flex items-center gap-6 pt-2 text-xs font-black uppercase text-slate-400 opacity-80">
                <span>Zaptor India</span>
                <span>Boat Acoustics</span>
                <span>Noise Tech</span>
                <span>Lenovo Bharat</span>
                <span>Cosmic Byte</span>
              </div>

            </div>

            {/* Hero Right Warm Beige Container */}
            <div className="lg:col-span-6 relative">
              <div className="bg-[#fbf3e6] rounded-[2.5rem] p-8 shadow-xl border border-[#f3e4cb] space-y-6 relative overflow-hidden transition-all duration-700">
                
                {/* Floating Callout Tag */}
                <div className="flex items-center justify-between">
                  <div className="bg-[#fef08a] text-[#713f12] text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                    {currentItem.category}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {HERO_ROTATING_ITEMS.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setHeroIndex(i)} 
                        className={`h-2 rounded-full transition-all duration-300 ${i === heroIndex ? 'w-6 bg-[#135f52]' : 'w-2 bg-slate-300'}`} 
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Product Card with Customer Demographics */}
                <div key={heroIndex} className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 max-w-md mx-auto space-y-4 relative mt-2 animate-in fade-in zoom-in duration-500">
                  
                  <div className="h-44 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-4 relative group">
                    <img 
                      src={currentItem.image} 
                      alt={currentItem.productName} 
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'; }}
                    />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-teal-400" /> Changes every 5s
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 truncate max-w-[200px] mb-1">{currentItem.productName}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-extrabold text-slate-900">{currentItem.rating}</span>
                        <div className="text-amber-400 text-sm">★★★★★</div>
                      </div>
                      <div className="text-xs text-slate-500 font-semibold">Based on {currentItem.reviewsCount} reviews</div>
                    </div>

                    <Link to="/directory" className="bg-slate-50 hover:bg-slate-200 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl transition">
                      View Live
                    </Link>
                  </div>

                  {/* Customer Demographic Floating Callout Badge */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-teal-500">
                        <img src={currentItem.reviewer.avatar} alt={currentItem.reviewer.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-slate-950 font-bold">{currentItem.reviewer.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{currentItem.reviewer.city} • <span className="text-emerald-700 font-bold">✓ Verified Indian Buyer</span></div>
                      </div>
                    </div>

                    <p className="text-slate-700 text-xs italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                      "{currentItem.reviewer.comment}"
                    </p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] pt-1 border-t border-slate-100">
                      <div className="text-slate-500">Feature: <strong className="text-slate-900">{currentItem.reviewer.highlight1}</strong></div>
                      <div className="text-slate-500">Order ID: <strong className="text-slate-900 font-mono">{currentItem.reviewer.orderId}</strong></div>
                      <div className="text-slate-500">Speed: <strong className="text-slate-900">{currentItem.reviewer.highlight2}</strong></div>
                      <div className="text-slate-500">Status: <strong className="text-teal-700 font-bold">Verified Purchase</strong></div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section: Company Reviews & Product Reviews (Matching Uploaded Image 1) */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Company Reviews Card with Pastel Glow Frame (Matching Image 1) */}
            <div className="p-[2px] rounded-[2rem] bg-gradient-to-r from-teal-200 via-emerald-100 to-purple-200 shadow-xl">
              <div className="bg-white p-10 rounded-[1.9rem] h-full flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#135f52] flex items-center justify-center border border-teal-100 shadow-sm">
                    <Store className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-950">Company <br />Reviews.</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Put your satisfied customers in the limelight! Add custom questions to gather reviews and easily display them using dynamic review widgets.
                  </p>
                </div>
                <div>
                  <Link to="/dashboard/company-reviews" className="border-2 border-slate-200 text-slate-900 hover:bg-white hover:text-slate-900 font-extrabold text-xs px-6 py-3 rounded-xl inline-block uppercase tracking-wider transition">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Reviews Card (Matching Image 1) */}
            <div className="p-10 rounded-[2rem] bg-slate-50 border border-slate-200 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100 shadow-sm">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-950">Product <br />Reviews.</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Unlock customer insights with product reviews. Dive deeper with attributes for informed decisions. Harness review invites for powerful social proof across platforms.
                </p>
              </div>
              <div>
                <Link to="/dashboard/product-reviews" className="border-2 border-slate-200 text-slate-900 hover:bg-white hover:text-slate-900 font-extrabold text-xs px-6 py-3 rounded-xl inline-block uppercase tracking-wider transition">
                  Learn More
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section: Product Reviews Pastel Section with Mobile Overlay (Matching Image 3) */}
      <section className="py-24 bg-gradient-to-r from-[#d8f3ec] via-[#ebf7f5] to-[#fdeded]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#135f52] flex items-center justify-center shadow-md">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Product Reviews
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                For eCommerce brands, product reviews are key to driving engagement. They bring unique, relatable content to landing pages, boost your visibility in Google Shopping, and help consumers make informed decisions.
              </p>
              <div className="flex gap-4 pt-2">
                <Link to="/signup" className="bg-[#135f52] hover:bg-[#0d453b] text-slate-900 font-bold text-sm px-6 py-3 rounded-xl shadow-lg">
                  Get Started
                </Link>
                <Link to="/dashboard" className="border-2 border-slate-200 text-slate-900 font-bold text-sm px-6 py-3 rounded-xl hover:bg-white hover:text-slate-900 transition">
                  Book Demo
                </Link>
              </div>
            </div>

            {/* Mobile Phone Mockup Overlay (Matching Image 3) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl border-4 border-slate-100 max-w-sm w-full space-y-4 relative">
                <div className="h-44 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80" alt="Noise Smartwatch" className="max-h-full object-contain" />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-amber-500 font-extrabold">★★★★★ 4.8</span>
                  <span className="text-slate-500 font-semibold">512 Reviews</span>
                </div>
                <button className="w-full bg-[#135f52] text-slate-900 font-bold text-xs py-2.5 rounded-xl uppercase tracking-wider">
                  Add To Cart
                </button>

                {/* Floating "Write a review" dialog */}
                <div className="bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center font-bold">
                    <span>Write a review</span>
                    <span className="text-amber-500">★★★★★</span>
                  </div>
                  <p className="text-[11px] text-slate-600 italic">"Delivered super fast via Express courier. Battery backup is awesome!"</p>
                  <Link to="/review/submit" className="w-full bg-[#135f52] text-slate-900 font-bold text-center block py-1.5 rounded-lg text-[11px]">
                    Leave a Review
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section: Empowering you to drive growth (Matching Uploaded Image 4) */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Empowering you to drive growth</h2>
            <p className="text-slate-600 text-base">From automated review invites to multi-channel reputation distribution.</p>
          </div>

          {/* 3 Overview Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-extrabold text-lg text-slate-900">Collect reviews</h4>
              <p className="text-xs text-slate-600">Set up flows that ask at the right moment, in the format each customer is most likely to use.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-extrabold text-lg text-slate-900">Elevate conversions</h4>
              <p className="text-xs text-slate-600">Show the reviews that convert, directly on the pages where shoppers decide.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-extrabold text-lg text-slate-900">Optimize experience</h4>
              <p className="text-xs text-slate-600">Gain insights, understand your customers better and enhance their shopping experience.</p>
            </div>
          </div>

          {/* Flow Cards Grid (Matching Image 4) */}
          <div className="bg-[#eaf4f2] p-8 rounded-[2.5rem] border border-[#cbe8e1] grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Flow Steps */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-xl space-y-4">
              <div className="bg-[#fef08a] text-[#713f12] text-xs font-extrabold px-3 py-1 rounded-full w-fit">
                Custom flow
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-[#135f52] flex items-center justify-center font-bold">1</div>
                  <div>
                    <div className="font-bold text-slate-900">Customer received product</div>
                    <div className="text-[10px] text-slate-500">Triggered via courier API</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-[#135f52] flex items-center justify-center font-bold">2</div>
                  <div>
                    <div className="font-bold text-slate-900">Send invite #1</div>
                    <div className="text-[10px] text-slate-500">Email review invitation</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold">3</div>
                  <div>
                    <div className="font-bold text-slate-900">Wait 7 days</div>
                    <div className="text-[10px] text-slate-500">Allow time to test item</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">4</div>
                  <div>
                    <div className="font-bold text-slate-900">Review received</div>
                    <div className="text-[10px] text-slate-500">Verified buyer badge</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center font-bold">5</div>
                  <div>
                    <div className="font-bold text-slate-900">Send SMS asking for UGC</div>
                    <div className="text-[10px] text-slate-500">WhatsApp / SMS media</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Reputation Manager */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-xl space-y-5">
              <div className="bg-[#fef08a] text-[#713f12] text-xs font-extrabold px-3 py-1 rounded-full w-fit">
                Reputation manager
              </div>

              <div className="space-y-4 text-xs font-bold text-slate-800">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span>★ ReviewSphere Platform</span>
                  <span className="w-9 h-5 bg-[#135f52] rounded-full relative inline-block"><span className="w-3.5 h-3.5 bg-white rounded-full absolute right-1 top-0.5" /></span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span>Google Local Ratings</span>
                  <span className="w-9 h-5 bg-[#135f52] rounded-full relative inline-block"><span className="w-3.5 h-3.5 bg-white rounded-full absolute right-1 top-0.5" /></span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span>Facebook Commerce</span>
                  <span className="w-9 h-5 bg-slate-300 rounded-full relative inline-block"><span className="w-3.5 h-3.5 bg-white rounded-full absolute left-1 top-0.5" /></span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-500 mb-2">Set invite distribution:</div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                  <span>50% on ReviewSphere</span>
                  <span>50% on Google</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#135f52] h-full w-1/2" />
                </div>
              </div>
            </div>

            {/* Right Invitation Email Preview */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-xl space-y-4">
              <div className="bg-[#fef08a] text-[#713f12] text-xs font-extrabold px-3 py-1 rounded-full w-fit">
                Review invitation emails
              </div>

              <div className="border border-slate-200 rounded-2xl p-4 space-y-3 text-center text-xs">
                <div className="font-extrabold text-sm text-slate-900">ZAPTOR ELECTRONICS</div>
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80" alt="Item" className="w-20 h-20 mx-auto object-contain" />
                <div className="font-bold text-slate-800">Rate your purchase out of 5</div>
                <div className="flex justify-center gap-1 text-teal-600 text-lg">★★★★★</div>
                <div className="p-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 text-[11px]">
                  📷 Upload a photo or video
                </div>
                <button className="w-full bg-slate-50 text-slate-900 font-bold py-2 rounded-xl text-xs">
                  Submit review
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0a1215] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Start collecting customer feedback today.</h2>
          <p className="text-slate-300 text-lg font-medium">100% Free platform for Indian businesses. No credit card required.</p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-[#135f52] hover:bg-[#0d453b] text-white font-extrabold text-lg px-9 py-4 rounded-2xl shadow-2xl transition hover:scale-105"
          >
            Create Free Account <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

