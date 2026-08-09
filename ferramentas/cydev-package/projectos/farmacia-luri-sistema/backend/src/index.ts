import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import syncRouter from './routes/sync';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/sync', syncRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🟢 Sync Backend online na porta ${PORT}`));