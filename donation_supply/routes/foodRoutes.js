const express = require("express");
const router = express.Router();
const { preserveFood } = require("../controllers/foodController"); 
const {donateFreeController} = require("../controllers/foodController");



// Route for food preservation prediction
router.post("/preserve", preserveFood);
// Route to allocate food for free donations
router.post("/donate-free", donateFreeController);

module.exports = router;
