import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Sparkles, ChevronDown, ShieldCheck, BarChart3, MessageSquare, LayoutGrid, Award, Sliders, ArrowRight, Zap } from 'lucide-react';

export const PublicHeader = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-teal-400 font-extrabold shadow-md group-hover:scale-105 transition">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-950">Review<span className="text-[#135f52]">Sphere</span></span>
            <span className="block text-[9px] uppercase tracking-widest font-extrabold text-[#135f52] -mt-1">Free Intelligence SaaS</span>
          </div>
        </Link>

        {/* Navigation Menu Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-700">
          
          {/* Platform Mega Menu Trigger */}
          <div 
            className="relative py-6"
            onMouseEnter={() => setActiveMenu('platform')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#135f52] transition">
              Platform <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'platform' ? 'rotate-180 text-[#135f52]' : ''}`} />
            </button>

            {/* Platform Mega Menu Dropdown Card (Matching Reference Image 4) */}
            {activeMenu === 'platform' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 grid grid-cols-12 gap-8 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Column 1: Products */}
                <div className="col-span-4 space-y-4 border-r border-slate-100 pr-6">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Products</h4>
                  
                  <Link to="/features" className="group flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50 transition">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#135f52] flex items-center justify-center group-hover:bg-[#135f52] group-hover:text-slate-900 transition">
                      <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-[#135f52]">Reviews</div>
                      <div className="text-xs text-slate-500 font-normal">Collect, manage, and showcase feedback in one place.</div>
                    </div>
                  </Link>

                  <Link to="/features" className="group flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50 transition">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-slate-900 transition">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-emerald-700">UGC</div>
                      <div className="text-xs text-slate-500 font-normal">Convert more visitors into buyers with impactful UGC.</div>
                    </div>
                  </Link>

                  <Link to="/features" className="group flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50 transition">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center group-hover:bg-sky-700 group-hover:text-slate-900 transition">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-sky-700">Surveys & NPS</div>
                      <div className="text-xs text-slate-500 font-normal">Enrich your customer profiles and gain actionable insights.</div>
                    </div>
                  </Link>
                </div>

                {/* Column 2: Features */}
                <div className="col-span-5 grid grid-cols-2 gap-3 border-r border-slate-100 pr-6">
                  <div className="col-span-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Features</h4>
                  </div>

                  <Link to="/dashboard/product-reviews" className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-[#135f52]">
                    <Award className="w-4 h-4 text-[#135f52]" /> Product Reviews
                  </Link>
                  <Link to="/dashboard/company-reviews" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-[#135f52]">
                    <ShieldCheck className="w-4 h-4 text-[#135f52]" /> Company Reviews
                  </Link>
                  <Link to="/dashboard/ai-insights" className="col-span-2 flex items-center justify-between p-3 rounded-2xl bg-[#0a1215] text-slate-900 text-xs font-bold shadow-md hover:bg-white">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-400" /> AI Insights
                    </div>
                    <span className="bg-teal-500 text-slate-950 text-[10px] uppercase px-2 py-0.5 rounded-full font-extrabold">New</span>
                  </Link>
                  <Link to="/dashboard/campaigns" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-[#135f52]">
                    <Zap className="w-4 h-4 text-[#135f52]" /> Review Invite Flows
                  </Link>
                  <Link to="/dashboard/analytics" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-[#135f52]">
                    <Sliders className="w-4 h-4 text-[#135f52]" /> Attributes
                  </Link>
                </div>

                {/* Column 3: Featured Banner (Matching Image 4) */}
                <div className="col-span-3 bg-gradient-to-br from-[#135f52] to-slate-950 rounded-2xl p-5 text-slate-900 flex flex-col justify-between shadow-xl">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-200 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-teal-500/30">
                      <Sparkles className="w-3 h-3" /> Boost x ReviewSphere
                    </div>
                    <h5 className="text-sm font-bold leading-snug">Build shopper confidence by leveraging Boost</h5>
                  </div>
                  <Link to="/signup" className="text-xs font-bold text-teal-300 hover:text-slate-900 flex items-center gap-1 mt-4">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/directory" className="hover:text-[#135f52] transition">Directory</Link>
          <Link to="/dashboard/analytics" className="hover:text-[#135f52] transition">Analytics</Link>

          {/* Resources Mega Menu Trigger */}
          <div 
            className="relative py-6"
            onMouseEnter={() => setActiveMenu('resources')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#135f52] transition">
              Resources <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'resources' ? 'rotate-180 text-[#135f52]' : ''}`} />
            </button>

            {/* Resources Dropdown */}
            {activeMenu === 'resources' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[750px] bg-slate-50 text-slate-900 rounded-3xl shadow-2xl border border-slate-200 p-8 grid grid-cols-12 gap-8 z-50 animate-in fade-in duration-200">
                <div className="col-span-5 space-y-4 border-r border-slate-200 pr-6">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-400">Learn</h4>
                  <div className="space-y-3 text-xs">
                    <Link to="/features" className="block font-bold hover:text-teal-300">Success Stories</Link>
                    <Link to="/features" className="block font-bold hover:text-teal-300">PySpark Sentiment Guide</Link>
                    <Link to="/features" className="block font-bold hover:text-teal-300">Hadoop Review Storage ETL</Link>
                  </div>
                </div>

                <div className="col-span-7 space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-400">Support & API</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                    <Link to="/features" className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-teal-500">Developer REST API</Link>
                    <Link to="/dashboard/widgets" className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-teal-500">Widget Embed System</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard/ai-insights"
            className="hidden sm:inline-flex items-center gap-1.5 border-2 border-slate-300 hover:border-[#135f52] text-slate-800 font-bold text-xs px-4 py-2 rounded-full transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" /> AI Presence
          </Link>

          <Link 
            to="/login" 
            className="text-sm font-bold text-slate-700 hover:text-slate-950 px-2 py-2 transition"
          >
            Login
          </Link>

          <Link 
            to="/dashboard" 
            className="bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-200 font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            Watch Demo
          </Link>

          <Link 
            to="/signup" 
            className="bg-[#135f52] hover:bg-[#0d453b] text-slate-900 font-bold text-sm px-6 py-2.5 rounded-xl transition shadow-md shadow-teal-900/20"
          >
            Get started
          </Link>
        </div>

      </div>
    </header>
  );
};

