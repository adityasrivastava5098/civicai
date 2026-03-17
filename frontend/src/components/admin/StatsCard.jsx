import React from 'react';

const StatsCard = ({ title, value, icon, color, trend }) => {
  const colorVariants = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    red: 'text-red-500 bg-red-500/10 border-red-500/20',
    yellow: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    green: 'text-green-500 bg-green-500/10 border-green-500/20',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-slate-700 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${colorVariants[color] || colorVariants.blue} border`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white tracking-tight">{value.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default StatsCard;
