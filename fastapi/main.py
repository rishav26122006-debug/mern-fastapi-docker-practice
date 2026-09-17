from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Task Stats API")

class Stats(BaseModel):
    total: int
    completed: int
    pending: int

@app.get("/")
def root():
    return {"message": "FastAPI is running"}

@app.post("/stats", response_model=Stats)
def stats(data: list[dict]):
    total = len(data)
    completed = sum(1 for task in data if task.get("completed") is True)
    return {
        "total": total,
        "completed": completed,
        "pending": total - completed
    }
