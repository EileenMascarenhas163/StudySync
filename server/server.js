const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

const allowedOrigins = [
  "https://study-sync-chi-nine.vercel.app", // Your Vercel frontend URL from .env
  "http://localhost:5173", // Your local Vite dev server
  "http://localhost:3000", // A common alternative local dev server
]

const corsOptions = {
  // 2. Use a function for the origin to check against the whitelist.
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman, mobile apps, or curl)
    if (!origin) return callback(null, true)
    
    // If the request origin is in our whitelist, allow it.
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      // Otherwise, block it.
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true, // This is essential for sending cookies (JWT) across domains.
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}
// Middleware
app.use(cors(corsOptions));
app.use(express.json());




// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/schedules', require('./routes/schedules'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));