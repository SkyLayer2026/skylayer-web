import { Request, Response, NextFunction } from 'express';

export const syncAuth = (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers['x-sync-secret'];
  if (key !== process.env.SYNC_SECRET_KEY) {
    return res.status(401).json({ error: 'Chave de sincronização inválida' });
  }
  next();
};