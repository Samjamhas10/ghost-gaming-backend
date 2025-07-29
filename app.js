const express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const indexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3004;

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/ghostgame_db")
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

// middlewares
app.use(express.json());
app.use(cors());
app.use(requestLogger);

// routes
app.use("/", indexRouter);

app.use(errorLogger); // error loggging
app.use(errors()); // celebrate validation errors
app.use(errorHandler); // custom error handler

app.listen(PORT, () => {
  console.log(`Server is running on PORT 3004`);
});
