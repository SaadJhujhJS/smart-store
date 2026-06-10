const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

connectDB(); // Call the function to connect to the database

const app = express();

// Set CORS for frontend URL / allow single-node deploy
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL],
  credentials: true
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api/auth', require('./routes/authRoutes')); // Use auth routes
app.use('/api/products', require('./routes/productRoutes')); // Use product routes
app.use('/api/orders', require('./routes/orderRoutes')); // Use order routes
app.use('/api/analytics', require('./routes/analyticsRoutes')); // Use analytics routes

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('SmartStore API is running in Development mode...');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});