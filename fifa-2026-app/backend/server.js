import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import matchRoutes from './routes/matchRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/matches', matchRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
