const mongoose = require("mongoose");

// Define the Donation schema
const donationallocated = new mongoose.Schema({
    recipient: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  
});

// Create and export the model
const Donationallocated = mongoose.model("Donation", donationallocated);
module.exports = donationallocated;
