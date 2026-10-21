import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, MessageSquare, Star, Users, Package, ShoppingCart, 
  Send, GitFork, BarChart2, Sparkles, Bot, Code, Globe, Bell, Search, 
  Settings, UploadCloud, ShieldCheck, ChevronRight, LogOut, Building2
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const DashboardLayout = () => {
  const { business, notifications, currentUser, logoutUser } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Request Review', path: '/dashboard/request-review', icon: Send, badge: 'New' },
    { name: 'Reviews Inbox', path: '/dashboard/reviews', icon: MessageSquare },
    { name: 'Company Reviews', path: '/dashboard/company-reviews', icon: ShieldCheck },
    { name: 'Product Reviews', path: '/dashboard/product-reviews', icon: Star },
    { name: 'Customers', path: '/dashboard/customers', icon: Users },
    { name: 'Products', path: '/dashboard/products', icon: Package },
    { name: 'Orders', path: '/dashboard/orders', icon: ShoppingCart },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart2 },
    { name: 'AI Insights', path: '/dashboard/ai-insights', icon: Sparkles, badge: 'Dark Engine' },
    { name: 'AI Assistant', path: '/dashboard/ai-assistant', icon: Bot },
    { name: 'CSV Import', path: '/dashboard/import', icon: UploadCloud },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col md:flex-row">
      
      {/* Permanent Left Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 flex-shrink-0 flex flex-col justify-between">
        
        <div>
          {/* Business Brand Header */}
          <div className="p-5 border-b border-slate-200/80 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-extrabold shadow-md">
                <Star className="w-5 h-5 fill-slate-950 text-slate-950" />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-slate-900">Review<span className="text-teal-400">Sphere</span></span>
                <span className="block text-[9px] uppercase tracking-widest text-teal-400 font-extrabold -mt-1">Command Platform</span>
              </div>
            </Link>
          </div>

          {/* Active Business Badge */}
          {business && (
            <div className="px-4 py-3 m-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
              <img src={business.logo} alt={business.name} className="w-8 h-8 rounded-lg object-cover border border-slate-700" />
              <div className="overflow-hidden">
                <div className="font-bold text-xs text-slate-900 truncate">{business.name}</div>
                <div className="text-[10px] text-teal-400 font-semibold flex items-center gap-1">
                  <span>★ {business.rating}</span>
                  <span className="text-slate-600">•</span>
                  <span>{business.totalReviews} Reviews</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition ${isActive ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-teal-100 text-teal-700 text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded-md border border-teal-200">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Business Profile Quick Action */}
        <div className="p-4 border-t border-slate-200/80 space-y-2">
          <Link 
            to="/directory" 
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-600" />
              <span>Public Profile</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between flex-shrink-0">
          
          {/* Search bar */}
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search reviews, customers, orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-9 pr-4 py-2 border border-slate-200 focus:outline-none focus:border-teal-500 transition"
            />
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-4">
            
            {/* Free SaaS Tag */}
            <div className="hidden sm:flex items-center gap-1.5 bg-teal-50 text-teal-700 border border-teal-200 text-xs px-3 py-1 rounded-full font-extrabold">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              100% Free SaaS Platform
            </div>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition border border-slate-200"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full animate-ping" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                    <h4 className="text-xs font-bold text-slate-900">Notifications</h4>
                    <span className="text-[10px] text-teal-600 font-bold">{notifications.length} Unread</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                        <p className="text-slate-800 font-medium">{n.text}</p>
                        <span className="text-[10px] text-slate-400 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md">
                {currentUser?.name ? currentUser.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : (business?.name ? business.name.substring(0,2).toUpperCase() : 'BIZ')}
              </div>
              <div className="hidden sm:block text-xs">
                <div className="font-bold text-slate-900">{currentUser?.name || 'Business Admin'}</div>
                <div className="text-[10px] text-teal-600 font-medium">{business?.name || 'Enterprise Seller'}</div>
              </div>
            </div>

          </div>

        </header>

        {/* Dynamic Page Outlet */}
        <main className="flex-1 overflow-y-auto p-6 bg-white text-slate-900">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

