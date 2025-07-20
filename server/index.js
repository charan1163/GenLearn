// server\index.js (or server\Server.js)

import express from 'express'; // or const express = require('express');
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; // or require('dotenv').config();
import authRoutes from './routes/auth.js'; // or const authRoutes = require('./routes/auth');

dotenv.config();

// --- ADD THIS LINE HERE ---
mongoose.set('debug', true); // This will log all Mongoose operations

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, // Can remove these warnings later
  useUnifiedTopology: true // Can remove these warnings later
}).then(() => {
  console.log('MongoDB connected');
  console.log('Connected to database:', mongoose.connection.name); // Keep this for verification
  app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// If using ES Modules (import/export), keep this:
export default app;