import React, { useState } from 'react';
import { Send, Plus, Mail, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CampaignsPage = () => {
  const { campaigns, loading } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (loading) return <div className="p-8 text-center text-slate-400">Loading Campaigns...</div>;

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Review Campaigns</h1>
          <p className="text-xs text-slate-400 mt-1">Automate customer review requests, track opened rates and collection metrics.</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="bg-teal-600 hover:bg-teal-500 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map(c => (
          <div key={c.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-base">{c.name}</h3>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                {c.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400">Sent Invitations:</span>
                <div className="text-lg font-bold text-slate-900">{c.invitationsSent.toLocaleString()}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400">Collection Rate:</span>
                <div className="text-lg font-bold text-teal-400">{c.collectionRate}%</div>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex justify-between pt-2 border-t border-slate-200">
              <span>Channel: {c.channel}</span>
              <span>Trigger: {c.trigger} ({c.delayDays}d delay)</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

