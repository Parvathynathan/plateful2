const Donation = require("../models/Donation").Donation;
const { allocateFood } = require("../ollama/aiAllocation");
const { Ollama } = require("ollama");
const ollama = new Ollama();


exports.createDonation = async (req, res) => {
  try {
    console.log("Request Received:", req.body);

    const { foodType, quantity, price, location ,perishable} = req.body;

    // Check if required fields exist
    if (  !foodType || !quantity || !location || !price || !perishable) {
      console.log("❌ Missing fields!");
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("✅ Fields are valid, saving donation...");

    // Save donation in DB
    const newDonation = await Donation.create({ foodType, quantity, price, location,perishable });

    console.log("✅ Donation saved:", newDonation);

    // Call AI allocation
    console.log("🚀 Calling allocateFood...");
    const allocationResult = await allocateFood(foodType, location);
    console.log("✅ AI Allocation Result:", allocationResult);

    res.status(201).json({
      message: "Donation recorded successfully!",
      donation: newDonation,
      allocation: allocationResult,
    });
  } catch (error) {
    console.error("❌ Error in createDonation:", error);
    res.status(500).json({ error: "Food Allocation Failed" });
  }
};

// Get all Donations
exports.getDonations = async (req, res) => {
  try {
    

    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);  
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};
