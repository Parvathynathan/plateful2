const express = require("express");
const router = express.Router();
const Shortage = require("../models/Donation").Shortage1; // Import the schema
const { predictShortage } = require("../ollama/predictShortage");

// Report a shortage
router.post("/report", async (req, res) => {
  try {
    console.log("Incoming request:", req.body); // Debugging log
    const { foodBank, location, foodType } = req.body;

    if (!foodBank || !location || !foodType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the shortage already exists
    let shortage = await Shortage.findOne({ foodBank, location, foodType });

    if (shortage) {
      shortage.shortageCount += 1;
      shortage.lastUpdated = Date.now();
    } else {
      shortage = new Shortage({ foodBank, location, foodType });
    }

    await shortage.save();
    res.status(201).json({ message: "Shortage reported successfully", shortage });
  } catch (error) {
    console.error("Error reporting shortage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/predict", async (req, res) => {
  const { foodType, location } = req.body;

  try {
      const prediction = await predictShortage(foodType, location);
      res.json(prediction);
  } catch (error) {
      res.status(500).json({ error: "AI Prediction Failed" });
  }
});

module.exports = router;
