# CivicAI Admin Dashboard

A modern, high-performance admin dashboard for managing civic issues. Built with React, Tailwind CSS, and Leaflet Maps.

## 🚀 Key Features

- **Dashboard Overview**: Real-time stats and Recent Complaints tracking.
- **Advanced Filtering**: Search and filter issues by ID, location, or status.
- **Analytics**: Beautiful visualizations of issue distribution and resolution metrics using Recharts.
- **Geospatial Tracking**: Interactive Leaflet maps for precise issue localization.
- **Dark Theme UI**: Premium aesthetic with glassmorphism and modern typography.
- **State Persistence**: Local storage integration for simulated real-time updates.

## 🛠 Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Maps**: Leaflet / React-Leaflet
- **Icons**: Lucide React
- **Routing**: React Router

## 📦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `/components` - Reusable UI elements (Sidebar, StatsCard, Table, etc.)
- `/pages` - Top-level views (Dashboard, Analytics)
- `/data` - Mock complaint data in JSON format

## 🧪 Mock Data Fields

Each complaint includes:
- `id`: Unique reference (CIV-XXXXX)
- `type`: Issue category
- `location`: Human-readable area
- `severity`: High/Medium/Low
- `status`: Open/In Progress/Resolved/Closed
- `progress`: Percentage completion
- `latitude` / `longitude`: Map coordinates
