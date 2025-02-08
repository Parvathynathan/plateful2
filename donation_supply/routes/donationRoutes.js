const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const { predictFoodPreservation } = require("../controllers/foodController"); // Ensure this function is imported
const Donation = require("../models/Donation").Donation;


// ✅ Route to create a new donation
router.post("/", donationController.createDonation);

// ✅ Route to predict food preservation
router.post("/preserve", async (req, res) => {
  try {
    const { foodType, cookingTime } = req.body;

    if (!foodType || !cookingTime) {
      return res.status(400).json({ error: "Missing foodType or cookingTime" });
    }

    const result = await predictFoodPreservation(foodType, cookingTime);
    res.json(result);
  } catch (error) {
    console.error("❌ Food Preservation Prediction Error:", error);
    res.status(500).json({ error: "Food preservation prediction failed." });
  }
});

// ✅ Route to get all donations
router.get("/", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const donations = await Donation.find(); 
    res.status(200).json(donations);
  } catch (error) {
    console.error("❌ Error fetching donations:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

module.exports = router;
