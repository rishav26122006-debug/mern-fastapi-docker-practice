import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const API = "http://localhost:5000/api";
const FASTAPI = "http://localhost:8000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  const loadTasks = async () => {
    const res = await fetch(`${API}/tasks`);
    setTasks(await res.json());
  };

  const loadStats = async (currentTasks) => {
    const res = await fetch(`${FASTAPI}/stats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentTasks)
    });
    setStats(await res.json());
  };

  useEffect(() => { loadTasks(); }, []);
  useEffect(() => { loadStats(tasks); }, [tasks]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    loadTasks();
  };

  const toggleTask = async (task) => {
    await fetch(`${API}/tasks/${task._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed })
    });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    loadTasks();
  };

  return (
    <main>
      <section className="card">
        <h1>Task Manager</h1>
        <p className="sub">Small MERN + FastAPI project</p>

        <div className="stats">
          <div><b>{stats.total}</b><span>Total</span></div>
          <div><b>{stats.completed}</b><span>Done</span></div>
          <div><b>{stats.pending}</b><span>Pending</span></div>
        </div>

        <form onSubmit={addTask}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter a task..."
          />
          <button>Add</button>
        </form>

        <div className="tasks">
          {tasks.map(task => (
            <div className="task" key={task._id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                />
                <span className={task.completed ? "done" : ""}>{task.title}</span>
              </label>
              <button className="delete" onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          ))}
          {tasks.length === 0 && <p className="empty">No tasks yet.</p>}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
