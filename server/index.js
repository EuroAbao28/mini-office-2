const express = require("express");
const color = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoute"));

app.listen(port, () => console.log("Server running on port:", port));
