// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "../generated/prisma/index.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();


// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Google Keep Backend is running" });
});

// // Get all users
app.get("/", async (req, res) => {
  const userCount = await prisma.user.count();
  res.json(
    userCount == 0
      ? "No users have been added yet."
      : "Some users have been added to the database."
  );
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
