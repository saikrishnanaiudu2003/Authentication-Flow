const express = require("express");
const router = require('./routes/userRouter')
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors")


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT || 6002;

// middleware //

app.use("/api",router)

mongoose.connect("mongodb+srv://<your>:<password>@cluster0.g5qgqv9.mongodb.net/USER?retryWrites=true&w=majority").then(()=>{
    app.listen(PORT);
    console.log("data base connected port 6002");
}).catch((err)=>console.log(err));
