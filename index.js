const cors = require('cors');
const express = require('express');
const app = express();

// Allow CORS from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // If you need to include cookies or HTTP authentication
}));

// Other app.use() configurations


const dotenv = require("dotenv")
dotenv.config()



app.use(express.json())
app.use(express.urlencoded({extended: true}))
require("./db")

const AuthRoutes = require("./Routes/AuthRoutes") 
app.use("/api", AuthRoutes)
 
const OtpRouter = require("./Routes/OtpRoutes")
app.use("/api", OtpRouter)

const AddExpenses = require("./Routes/AddexpensesRoutes")
app.use("/api", AddExpenses)



const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

