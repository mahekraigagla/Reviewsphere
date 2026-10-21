import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, UploadCloud, Search, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const OrdersPage = () => {
  const { orders, customers, products, createOrder, loading } = useData();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ customerId: customers[0]?.id || '', productId: products[0]?.id || '', amount: '', status: 'Delivered' });

  if (loading) return <div className="p-8 text-center text-slate-400">Loading Orders...</div>;

  const filtered = orders.filter(o => 
    o.id.toLowerCase().includes(search.toLowerCase()) || 
    o.customerName.toLowerCase().includes(search.toLowerCase()) ||
    o.productName.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.customerId || !formData.productId) return;
    await createOrder(formData);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Order Verification Ledger</h1>
          <p className="text-xs text-slate-400 mt-1">Order records are used by ReviewSphere to issue authentic Verified Buyer badges.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/dashboard/import" className="bg-slate-200 hover:bg-slate-700 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-teal-400" /> Import Orders CSV
          </Link>
          <button onClick={() => setShowAddModal(true)} className="bg-teal-600 hover:bg-teal-500 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Order Record
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 border border-slate-200 focus:outline-none focus:border-teal-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold">{filtered.length} Orders Total</span>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-800 uppercase text-[10px] bg-slate-100 font-extrabold">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Product Purchased</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Order Date</th>
                <th className="py-3 px-4">Verification Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-teal-800">{o.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{o.customerName}</td>
                  <td className="py-3.5 px-4 text-slate-800 font-medium">{o.productName}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">₹{o.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      o.status === 'Delivered' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-700 border border-slate-300'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{new Date(o.orderDate).toLocaleDateString()}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-teal-700 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Eligible for Verified Badge
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Order Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-50/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-white text-slate-900 w-full max-w-md rounded-2xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Create Order Record</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Select Customer</label>
                <select 
                  value={formData.customerId} 
                  onChange={e => setFormData({...formData, customerId: e.target.value})}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200"
                >
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Select Purchased Product</label>
                <select 
                  value={formData.productId} 
                  onChange={e => setFormData({...formData, productId: e.target.value})}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200"
                >
                  {products.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Order Status</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200"
                >
                  <option value="Delivered">Delivered</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Processing">Processing</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs text-slate-400">Cancel</button>
              <button type="submit" className="bg-teal-600 text-slate-900 font-bold text-xs px-4 py-2 rounded-xl">Save Order</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

