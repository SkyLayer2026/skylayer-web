import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import syncRouter from "./routes/sync";
import { pool } from "./config/db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/api/sync", syncRouter);
app.get("/api/health", (_, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🟢 Sync Backend online na porta ${PORT}`));

process.on("SIGINT", async () => { await pool.end(); process.exit(0); });
