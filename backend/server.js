import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/task_manager";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

app.get("/api/tasks", async (req, res) => {
  res.json(await Task.find().sort({ createdAt: -1 }));
});

app.post("/api/tasks", async (req, res) => {
  const task = await Task.create({ title: req.body.title });
  res.status(201).json(task);
});

app.patch("/api/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(task);
});

app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Express server: http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
