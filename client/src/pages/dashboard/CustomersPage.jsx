import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, UploadCloud, Search, Mail, Phone, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CustomersPage = () => {
  const { customers, addCustomer, loading } = useData();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '' });

  if (loading) return <div className="p-8 text-center text-slate-400">Loading Customers...</div>;

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    await addCustomer(formData);
    setFormData({ name: '', email: '', phone: '', location: '' });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Customer Management</h1>
          <p className="text-xs text-slate-400 mt-1">Manage business buyers, invite logs, order counts, and review history.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/dashboard/import" className="bg-slate-200 hover:bg-slate-700 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-teal-400" /> Import Customers CSV
          </Link>
          <button onClick={() => setShowAddModal(true)} className="bg-teal-600 hover:bg-teal-500 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Customer
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search customers by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 border border-slate-200 focus:outline-none focus:border-teal-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold">{filtered.length} Customers Total</span>
      </div>

      {/* Customers Table */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-800 uppercase text-[10px] bg-slate-100 font-extrabold">
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Reviews</th>
                <th className="py-3 px-4">Avg Rating</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 font-extrabold flex items-center justify-center border border-teal-200">
                      {c.name.charAt(0)}
                    </div>
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{c.email}</td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{c.location}</td>
                  <td className="py-3.5 px-4 font-bold text-teal-700">{c.ordersCount || 1}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{c.reviewsCount || 1}</td>
                  <td className="py-3.5 px-4 font-extrabold text-amber-500">★ {c.avgRating || 4.8}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {c.status || 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-50/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAdd} className="bg-white text-slate-900 w-full max-w-md rounded-2xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Add New Customer</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Email</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Phone</label>
                <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Location / City</label>
                <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs text-slate-400">Cancel</button>
              <button type="submit" className="bg-teal-600 text-slate-900 font-bold text-xs px-4 py-2 rounded-xl">Save Customer</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

