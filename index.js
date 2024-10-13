const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

// CORS options: allow localhost and deployed frontend
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-frontend-app.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests globally
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
