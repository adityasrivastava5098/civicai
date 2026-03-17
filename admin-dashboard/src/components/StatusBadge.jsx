import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    'Open': 'bg-red-500/10 text-red-500 border-red-500/20',
    'In Progress': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'Resolved': 'bg-green-500/10 text-green-500 border-green-500/20',
    'Closed': 'bg-slate-500/10 text-slate-500 border-slate-500/20',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles['Open']}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
