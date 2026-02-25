import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import dangerRoutes from "./routes/dangerroutes.js";

dotenv.config();

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/dangers", dangerRoutes);

// 🔹 Test Route
app.get("/", (req, res) => {
  res.send("🚀 SafeMaps Backend Running");
});

// 🔹 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });