import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
import authRoutes from './routes/authRoutes';  // Import the routes properly

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
import connectToDatabase from './config/database';
connectToDatabase();

// Routes
app.use('/api/auth', authRoutes);

// Log registered routes
console.log(app._router.stack.filter((r: any) => r.route).map((r: any) => r.route.path));

const PORT = process.env.PORT || 5000;

const rootPath = path.resolve(__dirname, '../../../..');
app.use(express.static(path.join(rootPath, "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(rootPath, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    try {
        console.log(`Server running on port ${PORT}`);
    } catch (err) {
        console.error('Error starting the server:', err);
        process.exit(1);
    }
});
