import dotenv from "dotenv";
dotenv.config();
import express from "express";
import indexRouter from "./routes/index.router.js";
import connectDB from "./config/db.js";

const app = express();

connectDB();

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.path);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.use("/api", indexRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});