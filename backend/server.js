const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlewares/error");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goal"));
app.use("/api/users", require("./routes/user"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
