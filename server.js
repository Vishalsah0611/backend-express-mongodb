import dotenv from "dotenv";
dotenv.config();
import express from "express";
import indexRouter from "./src/routes/index.router.js";
import connectDB from "./src/config/db.js";
import logger from "./src/middlewares/logger.js";

const app = express();

connectDB();

app.use(logger);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.use("/api", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});