import React from 'react';
import { AlertCircle, Clock, CheckCircle2, ListFilter } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ComplaintTable from '../components/ComplaintTable';

const Dashboard = ({ complaints, updateStatus }) => {
  const stats = [
    { 
      title: 'Total Complaints', 
      value: complaints.length, 
      icon: <ListFilter size={24} />, 
      color: 'blue' 
    },
    { 
      title: 'Open Issues', 
      value: complaints.filter(c => c.status === 'Open').length, 
      icon: <AlertCircle size={24} />, 
      color: 'red',
      trend: 12
    },
    { 
      title: 'In Progress', 
      value: complaints.filter(c => c.status === 'In Progress').length, 
      icon: <Clock size={24} />, 
      color: 'yellow',
      trend: -5
    },
    { 
      title: 'Resolved', 
      value: complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length, 
      icon: <CheckCircle2 size={24} />, 
      color: 'green',
      trend: 18
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-slate-400">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 font-semibold py-2 px-6 rounded-2xl hover:bg-slate-800 transition-all text-sm">Download Report</button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-2xl shadow-lg shadow-blue-500/20 transition-all text-sm">Add New Issue</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      {/* Recent Complaints */}
      <section>
        <ComplaintTable complaints={complaints} onUpdateStatus={updateStatus} />
      </section>
    </div>
  );
};

export default Dashboard;
