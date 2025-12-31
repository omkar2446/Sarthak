require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectToMongoose = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/request", require("./routes/accountRequestRoutes"));

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});

connectToMongoose().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("🚀 Server running on port 5000");
  });
});
