const express = require("express");
const color = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/stickynote", require("./routes/stickyNoteRoute"));
app.use("/api/checklist", require("./routes/checkListRoute"));

app.listen(port, () => console.log("Server running on port:", port));
