import { Router, Request, Response } from "express";
import { processSyncBatch } from "../services/syncProcessor";
import { pool } from "../config/db";
import { syncAuth } from "../middleware/auth";

const router = Router();

router.post("/batch", syncAuth, async (req: Request, res: Response) => {
  try {
    const { branchId, operations } = req.body;
    if (!branchId || !Array.isArray(operations)) return res.status(400).json({ error: "Payload inválido" });

    const batchId = req.body.batchId || crypto.randomUUID();
    const result = await processSyncBatch(pool, batchId, branchId, operations);

    if (result.success) return res.json({ success: true, batchId, synced: result.processedCount });
    return res.status(422).json({ success: false, error: result.error });
  } catch (err: any) {
    res.status(500).json({ error: "Erro interno", details: err.message });
  }
});

export default router;
