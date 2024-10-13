const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

// Allowed origins (both localhost and deployed app)
const allowedOrigins = ['http://localhost:3000', 'https://your-frontend-app.vercel.app'];

const corsOptions = (req, callback) => {
  let corsOptions;
  const origin = req.header('Origin');

  if (allowedOrigins.includes(origin)) {
    corsOptions = { origin: origin, credentials: true }; // Reflect the requested origin
  } else {
    corsOptions = { origin: false }; // Disable CORS for other origins
  }
  callback(null, corsOptions);
};

// Apply CORS middleware with dynamic origin setting
app.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests
app.options('*', cors(corsOptions));

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./db");

// Define your routes
const AuthRoutes = require("./Routes/AuthRoutes");
app.use("/api", AuthRoutes);

const OtpRouter = require("./Routes/OtpRoutes");
app.use("/api", OtpRouter);

const AddExpenses = require("./Routes/AddexpensesRoutes");
app.use("/api", AddExpenses);

// Default route
app.use("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
