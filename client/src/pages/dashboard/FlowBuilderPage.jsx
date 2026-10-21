import React, { useState } from 'react';
import { GitFork, Send, Clock, Mail, MessageSquare, CheckCircle2, ArrowDown, Plus, Sparkles } from 'lucide-react';

export const FlowBuilderPage = () => {
  const [nodes, setNodes] = useState([
    { id: 1, title: 'Step 1: Order Delivered', type: 'trigger', desc: 'Triggered when courier marks order as delivered' },
    { id: 2, title: 'Step 2: Send Invite #1', type: 'action', desc: 'Sends email asking for star rating & feedback' },
    { id: 3, title: 'Step 3: Wait 7 Days', type: 'delay', desc: 'Gives customer time to test product quality' },
    { id: 4, title: 'Step 4: Check Review Status', type: 'condition', desc: 'If customer reviewed -> Thank You; else -> Send SMS' },
    { id: 5, title: 'Step 5: Send SMS UGC Request', type: 'action', desc: 'Asks for photo/video upload via mobile link' }
  ]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <GitFork className="w-6 h-6 text-teal-400" /> Visual Review Invite Flow Builder
          </h1>
          <p className="text-xs text-slate-400 mt-1">Design automated multi-channel review collection sequences (Email & SMS).</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/30">
            Flow Status: Active
          </span>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 space-y-6 shadow-2xl relative overflow-hidden">
        
        <div className="max-w-xl mx-auto space-y-6 relative">
          
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              
              {/* Flow Node Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-xl hover:border-teal-500/50 transition relative group">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900">{node.title}</span>
                  <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                    node.type === 'trigger' ? 'bg-emerald-500/20 text-emerald-300' :
                    node.type === 'delay' ? 'bg-amber-500/20 text-amber-300' : 'bg-teal-500/20 text-teal-300'
                  }`}>
                    {node.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{node.desc}</p>
              </div>

              {/* Connecting Arrow */}
              {index < nodes.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-teal-400 shadow-md">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </div>
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

    </div>
  );
};

