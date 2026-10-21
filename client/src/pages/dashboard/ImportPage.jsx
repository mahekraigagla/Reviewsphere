import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ImportPage = () => {
  const { importCSV } = useData();
  const [importType, setImportType] = useState('customers');
  const [csvText, setCsvText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sampleCustomerCSV = `name,email,phone,location\nRahul Sharma,rahul.s@example.com,+91 9876543210,Mumbai\nPriya Patel,priya.p@example.com,+91 9876543211,Delhi\nAmit Verma,amit.v@example.com,+91 9876543212,Bengaluru`;
  const sampleProductCSV = `name,category,price,description\nLogitech MX Keys,Accessories,119,Wireless Illuminated Keyboard\nDell 27 Monitor,Displays,299,4K UHD IPS Monitor`;

  const handleImport = async () => {
    if (!csvText.trim()) return;
    setLoading(true);

    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].split(',').map(v => v.trim());
      const row = {};
      headers.forEach((h, idx) => {
        row[h] = vals[idx] || '';
      });
      rows.push(row);
    }

    const res = await importCSV(importType, rows);
    setLoading(false);
    setResult(res);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">CSV Data Import Center</h1>
        <p className="text-xs text-slate-400 mt-1">Import bulk historical customers, product catalogs, and order ledgers with validation.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6 shadow-xl">
        
        {/* Import Type Selector */}
        <div className="flex gap-3 text-xs font-bold">
          {['customers', 'products', 'orders'].map(t => (
            <button
              key={t}
              onClick={() => { setImportType(t); setResult(null); setCsvText(t === 'customers' ? sampleCustomerCSV : sampleProductCSV); }}
              className={`flex-1 p-3 rounded-xl uppercase tracking-wider border transition ${
                importType === t ? 'bg-teal-600 text-slate-900 border-teal-500' : 'bg-white text-slate-400 border-slate-200'
              }`}
            >
              Import {t}
            </button>
          ))}
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">Paste CSV Content (with headers):</label>
          <textarea 
            rows={8}
            value={csvText}
            onChange={e => setCsvText(e.target.value)}
            className="w-full bg-white text-teal-300 text-xs font-mono rounded-xl p-4 border border-slate-200 focus:outline-none focus:border-teal-500"
          />
        </div>

        <button 
          onClick={handleImport}
          disabled={loading || !csvText.trim()}
          className="bg-teal-600 hover:bg-teal-500 text-slate-900 font-bold text-xs px-6 py-3 rounded-xl transition flex items-center gap-2"
        >
          <UploadCloud className="w-4 h-4" /> {loading ? "Validating & Importing..." : `Validate & Import ${importType}`}
        </button>

        {/* Import Result Notification */}
        {result && (
          <div className="bg-emerald-950/60 border border-emerald-800/80 p-4 rounded-xl text-xs text-emerald-300 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="font-bold">Import Completed Successfully!</div>
              <div>Added {result.addedCount} new rows to database store.</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

