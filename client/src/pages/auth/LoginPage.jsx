import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('rahul@zaptor.in');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useData();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await loginUser(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 w-full max-w-md p-8 rounded-3xl shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-teal-400 font-extrabold shadow-md">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-2xl font-extrabold text-slate-950">Review<span className="text-[#135f52]">Sphere</span></span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-950">Welcome Back</h2>
          <p className="text-xs text-slate-500">Sign in to your Indian enterprise reputation command center.</p>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-700 border border-rose-200 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Business Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. rahul@zaptor.in"
              className="w-full bg-slate-50 text-slate-900 p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#135f52] font-medium"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-700 font-bold">Password</label>
              <span className="text-[11px] text-[#135f52] font-bold cursor-pointer">Forgot?</span>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 text-slate-900 p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#135f52] font-medium"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#135f52] hover:bg-[#0d453b] text-slate-900 font-bold py-3.5 rounded-xl transition shadow-lg text-sm flex items-center justify-center gap-2"
          >
            {loading ? "Signing in..." : "Sign In to Dashboard"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="bg-[#fbf3e6] p-3 rounded-xl border border-[#f3e4cb] text-center text-xs text-[#713f12]">
          <strong>Demo Login:</strong> <span className="font-mono">rahul@zaptor.in</span> / <span className="font-mono">password123</span>
        </div>

        <div className="text-center text-xs text-slate-500">
          New enterprise? <Link to="/signup" className="text-[#135f52] font-bold hover:underline">Create Free Account</Link>
        </div>
      </div>
    </div>
  );
};

