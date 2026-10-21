import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Heart } from 'lucide-react';

export const PublicFooter = () => {
  return (
    <footer className="bg-slate-50 text-slate-900 border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Brand Info */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-extrabold shadow-md">
              <Star className="w-5 h-5 fill-slate-950 text-slate-950" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">Review<span className="text-teal-400">Sphere</span></span>
          </div>
          <p className="text-sm text-slate-700 font-medium max-w-sm leading-relaxed">
            The 100% free customer review, reputation management, and feedback intelligence platform powered by Apache Spark MLlib and Hadoop HDFS.
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 w-fit px-3 py-1.5 rounded-full shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Free Forever for Businesses & Customers
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-800 mb-4">Platform</h4>
          <ul className="space-y-2.5 text-sm text-slate-700 font-semibold">
            <li><Link to="/features" className="hover:text-teal-700 transition">Company Reviews</Link></li>
            <li><Link to="/features" className="hover:text-teal-700 transition">Product Reviews</Link></li>
            <li><Link to="/dashboard/campaigns" className="hover:text-teal-700 transition">Automated Invite Flows</Link></li>
            <li><Link to="/dashboard/ai-insights" className="hover:text-teal-700 transition">AI Insights Command</Link></li>
            <li><Link to="/dashboard/widgets" className="hover:text-teal-700 transition">Widget Embed System</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-800 mb-4">Analytics & ML</h4>
          <ul className="space-y-2.5 text-sm text-slate-700 font-semibold">
            <li><Link to="/dashboard/analytics" className="hover:text-teal-700 transition">PySpark Sentiment Pipeline</Link></li>
            <li><Link to="/dashboard/analytics" className="hover:text-teal-700 transition">Hadoop HDFS Storage</Link></li>
            <li><Link to="/dashboard/analytics" className="hover:text-teal-700 transition">NPS Tracker</Link></li>
            <li><Link to="/dashboard/ai-assistant" className="hover:text-teal-700 transition">AI Review Assistant</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-800 mb-4">Directory & Access</h4>
          <ul className="space-y-2.5 text-sm text-slate-700 font-semibold">
            <li><Link to="/directory" className="hover:text-teal-700 transition">Browse Businesses</Link></li>
            <li><Link to="/login" className="hover:text-teal-700 transition">Business Login</Link></li>
            <li><Link to="/signup" className="hover:text-teal-700 transition">Create Free Account</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-700 font-medium gap-4">
        <div>© 2026 ReviewSphere. Built as a full-stack SaaS project. All rights reserved.</div>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for Big Data & Reputation Intelligence</span>
        </div>
      </div>
    </footer>
  );
};

