const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  foodType: String,
  quantity: String,
  price: String,
  location: String,
  perishable: String,
});

const donatefree = new mongoose.Schema({
  foodType: String,
  location: String,
  quantity: String,
  perishable: String,
});


const shortageSchema = new mongoose.Schema({
  foodBank: String,
  location: String,
  foodType: String,
  shortageCount: { type: Number, default: 1 },
  lastUpdated: { type: Date, default: Date.now },
});

const Donation = mongoose.model("Donation", donationSchema);
const Shortage1 = mongoose.model("Shortage", shortageSchema);
const Donatefree = mongoose.model("Donatefree", donatefree);

module.exports = { Donation, Shortage1 , Donatefree};
