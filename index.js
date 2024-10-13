const cors = require('cors');
const express = require('express');
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// Allow CORS from localhost:3000
app.use(cors({
  origin: 'https://animated-mochi-188972.netlify.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to your database
require('./db');

// Register your routes
const AuthRoutes = require('./Routes/AuthRoutes'); 
const OtpRouter = require('./Routes/OtpRoutes');
const AddExpenses = require('./Routes/AddexpensesRoutes');

app.use('/api', AuthRoutes);
app.use('/api', OtpRouter);
app.use('/api', AddExpenses);

// Set the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});