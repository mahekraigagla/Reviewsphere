import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Search, Building2 } from 'lucide-react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { useData } from '../../context/DataContext';

export const DirectoryPage = () => {
  const { business, reviews } = useData();
  const [search, setSearch] = useState('');

  const businesses = [
    {
      id: business?.id || 'BUS001',
      name: business?.name || 'ABC Electronics',
      category: business?.category || 'Consumer Electronics & Tech',
      rating: business?.rating || 4.72,
      reviewsCount: business?.totalReviews || 4825,
      logo: business?.logo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
      verifiedPct: 94
    },
    {
      id: 'BUS002',
      name: 'Froothy Fresh Beverages',
      category: 'Food & Beverage',
      rating: 4.88,
      reviewsCount: 1240,
      logo: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=150&auto=format&fit=crop&q=80",
      verifiedPct: 98
    },
    {
      id: 'BUS003',
      name: 'Hunter & Gather Organics',
      category: 'Health & Wellness',
      rating: 4.90,
      reviewsCount: 8120,
      logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80",
      verifiedPct: 96
    }
  ];

  const filtered = businesses.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PublicHeader />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight">Verified Business Directory</h1>
          <p className="text-slate-600 text-sm">Discover top-rated businesses, inspect customer feedback, and read authentic verified reviews.</p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search businesses by name or industry category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white p-4 pl-12 rounded-2xl shadow-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-600"
          />
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {filtered.map(b => (
            <div key={b.id} className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 space-y-4 hover:shadow-xl transition">
              <div className="flex items-center gap-4">
                <img src={b.logo} alt={b.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200" />
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{b.name}</h3>
                  <div className="text-xs text-slate-500">{b.category}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{b.rating} / 5</span>
                </div>
                <span className="text-slate-500">{b.reviewsCount.toLocaleString()} Reviews</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                  ✓ {b.verifiedPct}% Verified
                </span>
                <Link to={`/public/business/${b.id}`} className="text-xs font-bold text-teal-700 hover:text-teal-800">
                  View Profile →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

