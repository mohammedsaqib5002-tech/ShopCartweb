import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
console.log("JWT SECRET LOADED:", !! process.env.JWT_SECRET);

import authRoutes from "./routes/authRoutes.js";
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://shop-cartweb-6hmd-35n47hnjb-mohammedsaqib5002-1985s-projects.vercel.app"
];

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());
app.use((req, res, next) => {
  console.log("REQUEST RECIEVED:", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("ShopKart Backend is Running!");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`

      );
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
  }
}

startServer();
