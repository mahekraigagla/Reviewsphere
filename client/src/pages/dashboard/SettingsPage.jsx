import React, { useState } from 'react';
import { Settings, ShieldCheck, Check, Globe, Smartphone, Laptop, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const SettingsPage = () => {
  const { business, refreshData } = useData();
  const [formData, setFormData] = useState({
    name: business?.name || '',
    website: business?.website || '',
    category: business?.category || '',
    description: business?.description || '',
    publicBaseUrl: business?.publicBaseUrl || window.location.origin
  });
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const apiBase = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';
    await fetch(`${apiBase}/api/business`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setSaved(true);
    refreshData();
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Business Profile & Worldwide Settings</h1>
        <p className="text-xs text-slate-400 mt-1">Configure your business details and worldwide public review invitation domain.</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-5 shadow-xl text-xs">
        <div>
          <label className="block text-slate-400 font-bold mb-1">Business Name</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500" 
          />
        </div>

        <div>
          <label className="block text-slate-400 font-bold mb-1">Website URL</label>
          <input 
            type="text" 
            value={formData.website} 
            onChange={e => setFormData({...formData, website: e.target.value})} 
            className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500" 
          />
        </div>

        {/* Worldwide Public Review URL Domain */}
        <div className="bg-white/90 p-4 rounded-2xl border border-teal-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-400" />
              <label className="text-slate-900 font-extrabold text-xs">Worldwide Public Review Form URL (Production Domain)</label>
            </div>
            <span className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded font-bold border border-teal-500/20">Global Reach</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            All review invitation links sent to customers globally (via WhatsApp, Email, SMS & QR Code) will use this public base URL.
          </p>
          <input 
            type="text" 
            placeholder="e.g. https://your-reviewsphere-app.vercel.app or https://reviews.yourdomain.com"
            value={formData.publicBaseUrl} 
            onChange={e => setFormData({...formData, publicBaseUrl: e.target.value})} 
            className="w-full bg-slate-50 text-emerald-400 font-mono p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500" 
          />
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
            <span className="text-slate-800 font-bold">Quick Presets:</span>
            <button
              type="button"
              onClick={() => setFormData({...formData, publicBaseUrl: window.location.origin})}
              className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-lg border border-slate-300 flex items-center gap-1 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-teal-600" /> Current Host ({window.location.origin})
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, publicBaseUrl: 'http://192.168.0.103:3000'})}
              className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-lg border border-slate-300 flex items-center gap-1 shadow-sm"
            >
              <Smartphone className="w-3 h-3 text-emerald-700" /> Mobile Wi-Fi (192.168.0.103)
            </button>
          </div>
        </div>

        <div>
          <label className="block text-slate-400 font-bold mb-1">Business Category</label>
          <input 
            type="text" 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value})} 
            className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500" 
          />
        </div>

        <div>
          <label className="block text-slate-400 font-bold mb-1">Company Description</label>
          <textarea 
            rows={3} 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500" 
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button 
            type="submit" 
            className="bg-[#135f52] hover:bg-[#0d453b] text-slate-900 font-extrabold px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-lg shadow-teal-950/40"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-400" /> : null}
            {saved ? "Settings Saved Globally!" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

