const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const databaseSeeder = require('./databaseSender');
const productRoute = require('./routes/Product');
const orderRoute = require('./routes/Order');
const userRoute = require('./routes/Users');

const bodyParser = require('body-parser');
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

let cachedConnection = null;
let connectionPromise = null;

async function connectDb() {
  if (cachedConnection || mongoose.connection.readyState === 1) {
    cachedConnection = mongoose.connection;
    return cachedConnection;
  }

  if (!process.env.MONGOOSEDB_URL) {
    throw new Error('MONGOOSEDB_URL is not configured');
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGOOSEDB_URL)
      .then(() => {
        cachedConnection = mongoose.connection;
        console.log('Connected to MongoDB');
        return cachedConnection;
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
}

async function ensureDatabaseConnection(req, res, next) {
  try {
    await connectDb();
    next();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    res.status(500).json({ message: 'Database connection failed' });
  }
}

// Routes
if (process.env.ALLOW_SEED === 'true') {
  app.use('/api/seed', ensureDatabaseConnection, databaseSeeder);
}
app.use('/api/products', ensureDatabaseConnection, productRoute);
app.use('/api/users', ensureDatabaseConnection, userRoute);
app.use('/api/orders', ensureDatabaseConnection, orderRoute);

// PayPal API route
app.use('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Express Server!');
});

module.exports = app;
