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
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


// MongoDB connection
// MongoDB connection
async function connectDb() {
    try {
     // console.log(process.env.MONGOOSEDB_URL); 
      await mongoose.connect(process.env.MONGOOSEDB_URL);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error.message);
      process.exit(1);
    }
  }
  connectDb();

// Routes
app.use('/api/seed', databaseSeeder);
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);

// PayPal API route
app.use('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Express Server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
