const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 5000;

// Database connection
const db = require("./config/db");
const userRouter = require("./routes/userRouter");
db.connect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

// Routes configuration
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Nodejs is running....");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
