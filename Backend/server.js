require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectToMongoose = require("./config/db"); // ✅ NO {}

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/request", require("./routes/accountRequestRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../Frontend/dist/index.html"))
  );
}

connectToMongoose().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("🚀 Server running on port 5000");
  });
});
