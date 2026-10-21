import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, HelpCircle, BarChart2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AiAssistantPage = () => {
  const { askAiAssistant } = useData();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm your ReviewSphere AI Intelligence Assistant. Ask me anything about your customer feedback, product satisfaction, or delivery sentiment statistics.",
      stats: null
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    "Are customers happy with delivery?",
    "Which product has the most negative feedback?",
    "What do customers like most?",
    "What is our overall rating and NPS score?"
  ];

  const handleSend = async (qText) => {
    const query = qText || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!qText) setInput('');
    setLoading(true);

    const res = await askAiAssistant(query);
    setLoading(false);

    if (res.success) {
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: res.answer,
        stats: res.stats
      }]);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center font-extrabold shadow-lg">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Review Assistant</h1>
          <p className="text-xs text-slate-700 font-medium">Conversational AI interface grounded strictly in live review data and PySpark analytics.</p>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-800 font-bold">Suggested questions:</span>
        {suggestedQuestions.map(q => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            className="bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-300 transition shadow-sm"
          >
            "{q}"
          </button>
        ))}
      </div>

      {/* Chat Messages Box */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 min-h-[420px] flex flex-col justify-between shadow-2xl">
        
        <div className="space-y-4 overflow-y-auto max-h-[480px] pr-2">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-xl p-4 rounded-2xl space-y-2 ${
                m.sender === 'user' 
                  ? 'bg-teal-600 text-white font-semibold shadow-sm' 
                  : 'bg-white text-slate-900 border border-slate-200 shadow-md font-medium'
              }`}>
                <p className="leading-relaxed">{m.text}</p>

                {m.stats && (
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] font-mono text-teal-800">
                    <div className="font-bold text-slate-800 mb-1">DATA EVIDENCE:</div>
                    <pre className="whitespace-pre-wrap">{JSON.stringify(m.stats, null, 2)}</pre>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-teal-400 font-bold animate-pulse">
              <Sparkles className="w-4 h-4" /> Querying PySpark review dataset...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Ask a question about your reviews dataset..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-white text-slate-900 text-xs rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-teal-500"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="bg-teal-600 hover:bg-teal-500 text-slate-900 font-bold px-5 py-3 rounded-xl transition flex items-center gap-2 text-xs shadow-lg"
          >
            <Send className="w-4 h-4" /> Ask AI
          </button>
        </div>

      </div>

    </div>
  );
};

