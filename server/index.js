require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myportfolio';

// 1. Middleware
app.use(express.json());
app.use(cors());

// --- IMPORT ROUTES ---
const projectRoutes = require('./routes/projects');
// const profileRoutes = require('./routes/profile'); // Uncomment if you are using profile routes

// --- USE ROUTES ---
app.use('/api/projects', projectRoutes);
// app.use('/api/profile', profileRoutes);

// 2. Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`✅ MongoDB Connected successfully`);
    } catch (error) {
        console.error(`❌ DB Connection Error: ${error.message}`);
        process.exit(1);
    }
}
connectDB();

// 3. Simple Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// 4. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});