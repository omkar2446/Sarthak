const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectToMongoose = require("./config/db");

const app = express();

// ✅ ALLOW FRONTEND DOMAIN
app.use(
  cors({
    origin: "https://sarthak-6.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/request", require("./routes/accountRequestRoutes"));

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

connectToMongoose().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("🚀 Server running on port 5000");
  });
});
