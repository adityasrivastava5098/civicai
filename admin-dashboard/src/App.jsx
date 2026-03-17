import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import IssueDetails from './components/IssueDetails';
import mockData from './data/complaints.json';

function App() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Load local storage if exists, otherwise use mock data
    const savedData = localStorage.getItem('civicai_complaints');
    if (savedData) {
      setComplaints(JSON.parse(savedData));
    } else {
      setComplaints(mockData);
    }
  }, []);

  const updateComplaintStatus = (id, newStatus) => {
    const updated = complaints.map(c => {
      if (c.id === id) {
        let progress = c.progress;
        if (newStatus === 'Resolved') progress = 100;
        if (newStatus === 'Closed') progress = 100;
        if (newStatus === 'Open') progress = 0;
        if (newStatus === 'In Progress' && progress === 100) progress = 50;
        return { ...c, status: newStatus, progress };
      }
      return c;
    });
    setComplaints(updated);
    localStorage.setItem('civicai_complaints', JSON.stringify(updated));
  };

  return (
    <Router>
      <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
        <Sidebar aria-label="Main Navigation" />
        
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard complaints={complaints} updateStatus={updateComplaintStatus} />} />
            <Route path="/analytics" element={<Analytics complaints={complaints} />} />
            <Route path="/issue/:id" element={<IssueDetails complaints={complaints} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
