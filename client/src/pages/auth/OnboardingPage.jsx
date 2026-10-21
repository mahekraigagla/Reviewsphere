import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle2, ArrowRight, SkipForward } from 'lucide-react';

export const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Tell us about your business', desc: 'Confirm company name, logo, website and category.' },
    { id: 2, title: 'Add your first product', desc: 'Add item catalog, title, image URL and price.' },
    { id: 3, title: 'Import customers', desc: 'Upload customer email addresses and historical orders.' },
    { id: 4, title: 'Import orders', desc: 'Link delivered orders for verified buyer badge validation.' },
    { id: 5, title: 'Create your first review campaign', desc: 'Set up automated email review invitations.' },
    { id: 6, title: 'Customize public profile', desc: 'Personalize public company review page appearance.' },
    { id: 7, title: 'Create your first review widget', desc: 'Generate embed code for your store website.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 w-full max-w-xl p-8 rounded-3xl shadow-2xl space-y-6">
        
        {/* Top Progress Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-extrabold text-teal-400 uppercase tracking-widest">Business Onboarding</span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">{currentStep} / {steps.length} completed</h2>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-xs font-bold text-slate-400 hover:text-slate-900 flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200"
          >
            Skip Onboarding <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map(step => (
            <div 
              key={step.id}
              className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                step.id <= currentStep 
                  ? 'bg-slate-50 border-teal-500/40 text-slate-900' 
                  : 'bg-slate-50/40 border-slate-200/80 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  step.id <= currentStep ? 'bg-teal-600 text-slate-900' : 'bg-slate-200 text-slate-500'
                }`}>
                  {step.id <= currentStep ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                </div>
                <div>
                  <div className="font-bold text-xs">{step.title}</div>
                  <div className="text-[11px] text-slate-400">{step.desc}</div>
                </div>
              </div>

              {step.id === currentStep && (
                <button 
                  onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
                  className="bg-teal-600 hover:bg-teal-500 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl"
                >
                  Complete Step
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Finish Button */}
        <div className="pt-2">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-teal-600 hover:bg-teal-500 text-slate-900 font-bold py-3 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
          >
            Go to ReviewSphere Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

