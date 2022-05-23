const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlewares/error");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const path = require("path");
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goal"));
app.use("/api/users", require("./routes/user"));

//Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
