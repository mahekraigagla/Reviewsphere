import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const SignupPage = () => {
  const [businessName, setBusinessName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState('');
  const [businessCategory, setBusinessCategory] = useState('Consumer Electronics & Smart Tech');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { registerUser } = useData();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await registerUser({
      businessName,
      fullName,
      email,
      password,
      website,
      businessCategory
    });
    setLoading(false);

    if (res.success) {
      navigate('/onboarding');
    } else {
      setError(res.message || 'Registration error');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 w-full max-w-lg p-8 rounded-3xl shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-teal-400 font-extrabold shadow-md">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-2xl font-extrabold text-slate-950">Review<span className="text-[#135f52]">Sphere</span></span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-950">Create Free Enterprise Account</h2>
          <p className="text-xs text-slate-500">100% Free platform for Indian businesses and global commerce.</p>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-700 border border-rose-200 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Company / Store Name</label>
              <input 
                type="text" 
                required 
                value={businessName} 
                onChange={e => setBusinessName(e.target.value)} 
                placeholder="e.g. Bharat Tech Store" 
                className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#135f52]" 
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={fullName} 
                onChange={e => setFullName(e.target.value)} 
                placeholder="e.g. Vikram Sharma" 
                className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#135f52]" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Business Email</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="founder@store.in" 
                className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#135f52]" 
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Website URL</label>
              <input 
                type="url" 
                value={website} 
                onChange={e => setWebsite(e.target.value)} 
                placeholder="https://store.in" 
                className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#135f52]" 
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Industry Category</label>
            <select 
              value={businessCategory} 
              onChange={e => setBusinessCategory(e.target.value)} 
              className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#135f52] font-semibold"
            >
              <option value="Consumer Electronics & Smart Tech">Consumer Electronics & Smart Tech</option>
              <option value="Fashion & Apparel India">Fashion & Apparel India</option>
              <option value="Ayurveda, Health & Organic">Ayurveda, Health & Organic</option>
              <option value="Home & Kitchen Appliances">Home & Kitchen Appliances</option>
              <option value="Food, Spices & Beverage">Food, Spices & Beverage</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Create Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••" 
              className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#135f52]" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#135f52] hover:bg-[#0d453b] text-slate-900 font-bold py-3.5 rounded-xl transition shadow-lg text-sm flex items-center justify-center gap-2"
          >
            {loading ? "Creating Account..." : "Create Free Account"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already have an account? <Link to="/login" className="text-[#135f52] font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

