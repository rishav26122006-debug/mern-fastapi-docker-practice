# Task Manager — MERN + FastAPI

A small full-stack task manager demonstrating:
- React frontend
- Node.js + Express backend
- MongoDB database
- FastAPI service for task statistics

## Run

### Backend
```bash
cd backend
npm install
node server.js
```

Set `MONGO_URI` if using MongoDB Atlas. Default: `mongodb://127.0.0.1:27017/task_manager`

### FastAPI
```bash
cd fastapi
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite.

The frontend expects Express at `http://localhost:5000` and FastAPI at `http://localhost:8000`.
