import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, UploadCloud, Search, Star, Sparkles, Image, Check, ChevronDown, RefreshCw } from 'lucide-react';
import { useData } from '../../context/DataContext';

const CATEGORY_PRESETS = {
  'Fashion & Apparel': [
    { name: 'Banarasi Pure Silk Saree', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600' },
    { name: 'Chanderi Cotton Kurti Set', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600' },
    { name: 'Pure Linen Nehru Jacket', url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600' },
    { name: 'Kolhapuri Leather Mojaris', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600' },
    { name: 'Festive Anarkali Gown', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600' },
    { name: 'Full-Grain Leather Bag', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600' },
    { name: 'Organic Cotton Casual Kurta', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600' }
  ],
  'Food & Beverages': [
    { name: 'Special Indian Biryani Feast', url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600' },
    { name: 'Crispy Butter Masala Dosa', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600' },
    { name: 'Paneer Butter Masala Naan', url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600' },
    { name: 'Traditional South Indian Thali', url: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600' },
    { name: 'Artisan Filter Coffee Roast', url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600' },
    { name: 'Fresh Gourmet Salad Bowl', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600' }
  ],
  'Electronics & Audio': [
    { name: 'Boat Rockerz Headset', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600' },
    { name: 'Smart Fitness Watch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600' },
    { name: 'Lenovo ThinkPad Laptop', url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600' },
    { name: 'Mechanical Keyboard RGB', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600' },
    { name: 'Noise True Wireless Buds', url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600' }
  ],
  'Health & Wellness': [
    { name: 'Himalayan Shilajit Resin', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600' },
    { name: 'Cold-Pressed Virgin Coconut Oil', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600' },
    { name: 'Natural Aromatherapy Serum', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600' },
    { name: 'Organic Jute Yoga Mat', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600' }
  ],
  'Home & Kitchen': [
    { name: 'Handmade Ceramic Dinnerware', url: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=600' },
    { name: 'Ultrasonic Mist Diffuser', url: 'https://images.unsplash.com/photo-1583847268964-b28f40a0ae38?w=600' },
    { name: 'Ergonomic Work Desk Chair', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600' },
    { name: 'Minimalist Reading Lamp', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600' }
  ]
};

export const ProductsPage = () => {
  const { products, addProduct, loading, business, seedDemoData } = useData();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);

  // Derive default category from active business
  const getInitialCategory = () => {
    const catLower = (business?.category || '').toLowerCase();
    if (catLower.includes('food') || catLower.includes('dining') || catLower.includes('restaurant') || catLower.includes('hotel') || catLower.includes('beverage')) {
      return 'Food & Beverages';
    } else if (catLower.includes('fashion') || catLower.includes('clothing') || catLower.includes('apparel') || catLower.includes('saree')) {
      return 'Fashion & Apparel';
    } else if (catLower.includes('health') || catLower.includes('ayurveda') || catLower.includes('wellness') || catLower.includes('organic')) {
      return 'Health & Wellness';
    } else if (catLower.includes('kitchen') || catLower.includes('home')) {
      return 'Home & Kitchen';
    }
    return 'Fashion & Apparel';
  };

  const initialCat = getInitialCategory();
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [formData, setFormData] = useState({ 
    name: '', 
    category: initialCat, 
    price: '', 
    description: '', 
    image: CATEGORY_PRESETS[initialCat]?.[0]?.url || CATEGORY_PRESETS['Fashion & Apparel'][0].url 
  });

  // Re-sync default category whenever business changes
  React.useEffect(() => {
    const cat = getInitialCategory();
    setSelectedCategory(cat);
    setFormData(prev => ({
      ...prev,
      category: cat,
      image: CATEGORY_PRESETS[cat]?.[0]?.url || CATEGORY_PRESETS['Fashion & Apparel'][0].url
    }));
  }, [business?.category]);

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Loading Products...</div>;

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const defaultImg = CATEGORY_PRESETS[cat]?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600';
    setFormData({
      ...formData,
      category: cat,
      image: defaultImg
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    await addProduct(formData);
    const cat = getInitialCategory();
    setFormData({ 
      name: '', 
      category: cat, 
      price: '', 
      description: '', 
      image: CATEGORY_PRESETS[cat]?.[0]?.url || CATEGORY_PRESETS['Fashion & Apparel'][0].url 
    });
    setShowAddModal(false);
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
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Product Catalog Management</h1>
            <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-0.5 rounded-full border border-teal-200">
              {business?.name || 'Store Catalog'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage your exclusive business products, Indian Rupee (₹) prices, category tags, and verified customer review counts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {products.length === 0 && (
            <button 
              onClick={handleLoadDemo} 
              disabled={loadingDemo}
              className="bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold px-4 py-2.5 rounded-xl border border-amber-300 transition flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {loadingDemo ? "Loading Demo..." : "Load Demo Catalog"}
            </button>
          )}

          <Link to="/dashboard/import" className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 transition flex items-center gap-2 shadow-sm">
            <UploadCloud className="w-4 h-4 text-teal-600" /> Import CSV
          </Link>
          
          <button onClick={() => setShowAddModal(true)} className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search your products or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-teal-500 font-medium"
          />
        </div>
        <span className="text-xs text-slate-600 font-semibold">{filtered.length} Products in Catalog</span>
      </div>

      {/* Products Table or Empty State */}
      {filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-100">
            <Package className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              {products.length === 0 ? "Your Product Catalog is Clean & Empty" : "No products matched your search filter"}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              {products.length === 0 
                ? `Only products added by ${business?.name || 'your business'} will appear here. Click "Add Product" to add your first item or load category starter products.` 
                : "Try clearing your search term to see all available products."}
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-3 pt-2">
            <button 
              onClick={() => setShowAddModal(true)} 
              className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add First Product
            </button>
            {products.length === 0 && (
              <button 
                onClick={handleLoadDemo} 
                disabled={loadingDemo}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {loadingDemo ? "Loading..." : "Load Demo Catalog"}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 uppercase text-[10px] bg-slate-50 font-bold">
                  <th className="py-3.5 px-4">Product Item</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price (₹)</th>
                  <th className="py-3.5 px-4">Reviews</th>
                  <th className="py-3.5 px-4">Avg Rating</th>
                  <th className="py-3.5 px-4">Sentiment</th>
                  <th className="py-3.5 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-3">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50 flex-shrink-0"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300'; }} 
                      />
                      <div>
                        <div className="text-slate-900 font-bold">{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{p.id}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-medium">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900 text-sm">₹{Number(p.price).toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 font-bold text-teal-700">{p.reviewsCount} reviews</td>
                    <td className="py-3.5 px-4 font-extrabold text-amber-500 text-sm">★ {p.rating}</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-bold">{p.positivePct}% Positive</td>
                    <td className="py-3.5 px-4">
                      <Link to="/dashboard/product-reviews" className="text-teal-700 hover:text-teal-800 font-bold text-xs bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 hover:bg-teal-100 transition">
                        View Reviews →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleAdd} className="bg-white text-slate-900 w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4 my-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-teal-600" /> Add Product to {business?.name || 'Catalog'}
              </h3>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">Active Business</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Product Title *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Banarasi Pure Katan Silk Saree or Cotton Kurti"
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none font-medium" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Industry Category</label>
                  <select 
                    value={selectedCategory} 
                    onChange={e => handleCategoryChange(e.target.value)} 
                    className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none font-medium"
                  >
                    {Object.keys(CATEGORY_PRESETS).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Price (₹ INR) *</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="e.g. 2499"
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})} 
                    className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none font-medium" 
                  />
                </div>
              </div>

              {/* Category Preset Image Selection */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5 flex items-center justify-between">
                  <span>Pick Category Preset Image (or Paste URL Below)</span>
                  <span className="text-[10px] text-teal-600 font-semibold">{selectedCategory} Presets</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                  {CATEGORY_PRESETS[selectedCategory]?.map((imgObj, idx) => {
                    const isSelected = formData.image === imgObj.url;
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setFormData({...formData, image: imgObj.url})}
                        className={`relative aspect-square rounded-xl overflow-hidden border transition group ${
                          isSelected ? 'border-teal-600 ring-2 ring-teal-500/50' : 'border-slate-200 hover:border-slate-400'
                        }`}
                        title={imgObj.name}
                      >
                        <img src={imgObj.url} alt={imgObj.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-teal-700/50 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white drop-shadow" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Image URL with Live Preview */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Custom Image URL</label>
                <div className="flex gap-2 items-center">
                  <input 
                    type="url" 
                    value={formData.image} 
                    onChange={e => setFormData({...formData, image: e.target.value})} 
                    placeholder="https://images.unsplash.com/..." 
                    className="flex-1 bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none text-xs" 
                  />
                  {formData.image && (
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300'; }} 
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description (Optional)</label>
                <textarea 
                  rows="2"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Key craftsmanship details, material composition, sizes..."
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none text-xs resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)} 
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-md"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
