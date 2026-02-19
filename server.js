import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import serverless from 'serverless-http';

import connectDB from '../config/db.js';
import errorHandler from '../middleware/errorHandler.js';

// Routes
import authRoutes from '../routes/auth.js';
import productRoutes from '../routes/products.js';
import categoryRoutes from '../routes/categories.js';
import orderRoutes from '../routes/orders.js';
import paymentRoutes from '../routes/payments.js';
import reviewRoutes from '../routes/reviews.js';
import adminRoutes from '../routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ——— Security ———
app.use(
  helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' }, contentSecurityPolicy: false })
);
app.use(cors({ origin: true, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

// ——— Body Parsers ———
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ——— Static Files ———
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ——— API Routes ———
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// ——— Health Check ———
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ——— Serve Production Frontend ———
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// ——— Error Handler ———
app.use(errorHandler);

// ——— Database Connection & Optional Seeding ———
const init = async () => {
  try {
    await connectDB();
    console.log('✅ Database connected');
    // Optional: autoSeed code can be called here if needed
  } catch (err) {
    console.error('DB connection failed', err);
  }
};
init();

// ——— Export serverless function ———
export const handler = serverless(app);
