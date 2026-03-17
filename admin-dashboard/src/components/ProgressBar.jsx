import React from 'react';

const ProgressBar = ({ progress, status }) => {
  const getColor = () => {
    if (status === 'Resolved' || progress === 100) return 'bg-green-500';
    if (status === 'In Progress') return 'bg-yellow-500';
    if (status === 'Open') return 'bg-red-500';
    return 'bg-slate-500';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[10px] font-bold text-slate-500 uppercase">{progress}% complete</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
        <div 
          className={`h-full ${getColor()} transition-all duration-500 ease-out rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
