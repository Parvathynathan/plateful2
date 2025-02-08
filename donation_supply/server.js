require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const donationRoutes = require("./routes/donationRoutes");
const shortageRoutes = require("./routes/shortageRoutes");
const foodRoutes = require("./routes/foodRoutes"); // ✅ Ensure correct path
const mlModelRoutes = require("./routes/foodRoutes");
const biogasRoutes = require("./routes/biogasRoutes");




const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // ✅ Ensures req.body works
app.use(cors({ origin: "*" })); // ✅ Allow all origins (adjust if needed)




// Routes

app.use("/api/donate", donationRoutes);
app.use("/api/shortage", shortageRoutes);
app.use('/api/auth', require('./routes/authRoutes'));

app.use("/api/food", foodRoutes);
app.use("/api", biogasRoutes);

// Error handling middleware (Improved)
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message || err); // ✅ Better logging
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
