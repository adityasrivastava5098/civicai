# 🏙️ CivicAI: Smart City Governance Platform

**CivicAI** is an AI-powered civic engagement platform that bridges the gap between citizens and urban authorities. Using **Gemini Vision AI**, it simplifies reporting city issues like potholes and garbage, transforming photos into actionable data for the government.

---

## 🚀 Brief Overview
CivicAI allows users to snap a photo of any civic problem. The system automatically:
1.  **Analyzes** the image to determine the issue type and severity.
2.  **Extracts** location data.
3.  **Removes** the burden of filling long forms for the citizen.
4.  **Organizes** reports into a live public feed and an Admin Dashboard for resolution tracking.

---

## 🛠️ Hosting Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/adityasrivastava5098/civicai.git
cd civicai
```

### 2️⃣ Backend Setup (FastAPI)
- **Navigate**: `cd backend`
- **Install**: `pip install -r requirements.txt`
- **Configure**: Create a `.env` file:
    ```env
    MONGO_URI=mongodb://localhost:27017
    GEMINI_API_KEY=your_key_here
    MONARCH_SECRET=RatUFrFSDWXg
    JWT_SECRET=your_secret
    ```
- **Run**: 
    ```bash
    python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```

### 3️⃣ Frontend Setup (React + Vite)
- **Navigate**: `cd frontend`
- **Install**: `npm install`
- **Run**:
    ```bash
    npm run dev
    ```

---

## 📋 Key Commands
| Service | Action | Command |
| :--- | :--- | :--- |
| **Backend** | Start Server | `uvicorn backend.main:app --reload` |
| **Frontend** | Start Dev | `npm run dev` |
| **Database** | Check Logs | `python check_db_reports.py` (optional) |

---

## 🏗️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Leaflet Maps.
- **Backend**: FastAPI, MongoDB, Aiohttp.
- **AI**: Google Gemini 1.5 Flash.
- **Storage**: Monarch CDN (Remote Image Hosting).

---

Developed with ❤️ for the Hacknova-26 Hackathon.
