import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, ShieldCheck } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
  ];

  return (
    <aside id="sidebar" className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col pt-6">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <ShieldCheck className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">CivicAI Admin</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100 border border-transparent'
              }`
            }
          >
            <span className="group-hover:scale-110 transition-transform duration-200">
              {item.icon}
            </span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
          <p className="text-xs text-slate-500 uppercase font-semibold mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-sm text-slate-300 font-medium">All systems normal</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 text-center text-xs text-slate-600 border-t border-slate-800">
        © 2026 CivicAI Dashboard
      </div>
    </aside>
  );
};

export default Sidebar;
