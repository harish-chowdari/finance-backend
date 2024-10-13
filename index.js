const express = require("express")
const app = express()

const dotenv = require("dotenv")
dotenv.config()

const cors = require("cors");

// Update your CORS options
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-frontend-app.vercel.app'], // Add both your local and production frontends
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you are using cookies, sessions, or other credentials
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));



app.use(express.json())
app.use(express.urlencoded({extended: true}))
require("./db")

const AuthRoutes = require("./Routes/AuthRoutes") 
app.use("/api", AuthRoutes)
 
const OtpRouter = require("./Routes/OtpRoutes")
app.use("/api", OtpRouter)

const AddExpenses = require("./Routes/AddexpensesRoutes")
app.use("/api", AddExpenses)


app.use("/", (req, res) => {
    res.send("Hello World")
})



const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

