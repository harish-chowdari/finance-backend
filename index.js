const cors = require('cors');
const express = require('express');
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(cors({
  origin: 'https://finance-frontend-x1ey.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./db');

const AuthRoutes = require('./Routes/AuthRoutes'); 
const OtpRouter = require('./Routes/OtpRoutes');
const AddExpenses = require('./Routes/AddexpensesRoutes');

app.use('/api', AuthRoutes);
app.use('/api', OtpRouter);
app.use('/api', AddExpenses);

app.use("/api", (req, res) => {
  res.send("Hello World!");
});


const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});