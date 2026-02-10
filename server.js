const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// --- CORS Configuration (Zaroori Fix) ---
app.use(cors({
    origin: process.env.FRONTEND_URL || "https://pathly-frontend.vercel.app/", // Render env var se uthayega
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Body parser (Routes se PEHLE hona chahiye)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// --- Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/events', require('./routes/events'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/reminders', require('./routes/reminders'));
app.use('/api/internships', require('./routes/internships'));

app.get('/', (req, res) => {
    res.send('Pathly API is running successfully...');
});

// Port handling for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.yellow.bold);
});