import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./Config/Mongodb.js";
import authRouter from "./Routes/AuthRoutes.js";
import userRouter from "./Routes/UserRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// ---------------- DB CONNECT ----------------
connectDB();

// ---------------- MIDDLEWARES ----------------
app.use(express.json());
app.use(cookieParser());

// ---------------- CORS CONFIG (FIXED) ----------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://auth2-6a79.vercel.app" // ✅ YOUR FRONTEND
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ---------------- ROUTES ----------------
app.get("/", (req, res) => {
  res.send("Backend Connected Successfully!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// ---------------- START SERVER ----------------
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
