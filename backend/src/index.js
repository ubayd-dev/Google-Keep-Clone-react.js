// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/UserRoutes.js";
import NotesRouter from "./routes/NotesRouter.js";
import prisma from "./db.js"; // relative to src/index.js
import ReminderRouter from "./routes/ReminderRouter.js";
import "./services/reminderjob.js";
import TaskRouter from "./routes/TaskRouter.js";
import { startReminderScheduler } from "./utils/scheduler.js";

dotenv.config();

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(
  cors({
    // origin URL
    //* methods []
    // include CRUD methods
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Basic health
app.get("/", async (req, res) => {
  const userCount = await prisma.user.count();
  res.json({
    status: "ok",
    message:
      userCount === 0
        ? "No users have been added yet."
        : "Some users have been added to the database.",
  });
});

// test api
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Mount routers (keeps existing endpoints you used earlier)
app.use("/user", UserRoutes);
app.use("/notes", NotesRouter);
app.use("/task", TaskRouter);
app.use("/reminder", ReminderRouter);

// start the scheduler
startReminderScheduler();

const PORT = process.env.PORT || 1338;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
