import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, Legend 
} from 'recharts';

const Analytics = ({ complaints }) => {
  // Data for Issues by Type
  const typeData = useMemo(() => {
    const types = ['Pothole', 'Garbage', 'Waterlogging', 'Streetlight', 'Others'];
    return types.map(type => ({
      name: type,
      count: complaints.filter(c => c.type === type).length
    }));
  }, [complaints]);

  // Data for Issues by Status
  const statusData = useMemo(() => {
    const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
    return statuses.map(status => ({
      name: status,
      count: complaints.filter(c => c.status === status).length
    }));
  }, [complaints]);

  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#64748b'];
  const TYPE_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#22c55e'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl">
          <p className="text-slate-300 text-xs font-bold mb-1">{label}</p>
          <p className="text-blue-400 text-lg font-bold">
            {payload[0].value} <span className="text-sm font-normal text-slate-500">Issues</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Reporting Analytics</h1>
        <p className="text-slate-400">Deep dive into issue distribution and resolution metrics.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Issues by Type Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-colors shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-white">Issues by Type</h3>
            <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full font-semibold">DISTRIBUTION</span>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickCount={6}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(51, 65, 85, 0.3)' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={TYPE_COLORS[index % TYPE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Issues by Status Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-colors shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-white">Issues by Status</h3>
            <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full font-semibold">PROGRESS</span>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickCount={6}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(51, 65, 85, 0.3)' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
           <div>
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">Most Frequent</p>
              <p className="text-xl font-bold text-white">
                {typeData.reduce((prev, current) => (prev.count > current.count) ? prev : current).name}
              </p>
           </div>
           <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 font-bold">#1</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
           <div>
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">Critical Issues</p>
              <p className="text-xl font-bold text-white">
                {complaints.filter(c => c.severity === 'High' && c.status === 'Open').length}
              </p>
           </div>
           <div className="h-10 w-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 font-bold">!</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
           <div>
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">Completion Rate</p>
              <p className="text-xl font-bold text-white">
                {Math.round((complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length / complaints.length) * 100)}%
              </p>
           </div>
           <div className="h-10 w-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 font-bold">%</div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
