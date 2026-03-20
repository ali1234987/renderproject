
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import stripeRoutes from "./routes/stripeRoutes.js";
import contactRoutes from './routes/contactRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();

// Debug environment
console.log('PORT =', process.env.PORT);
console.log('MONGO_URI =', process.env.MONGO_URI ? 'FOUND' : 'NOT FOUND');

// ✅ Email debug (important for nodemailer)
console.log('EMAIL_USER =', process.env.EMAIL_USER ? 'FOUND' : 'NOT FOUND');
console.log('EMAIL_PASS =', process.env.EMAIL_PASS ? 'FOUND' : 'NOT FOUND');
console.log('OWNER_EMAIL =', process.env.OWNER_EMAIL ? 'FOUND' : 'NOT FOUND');

// Connect database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/stripe", stripeRoutes);
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));