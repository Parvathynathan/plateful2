const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.post("/predict", (req, res) => {
    const { food_type, temperature, humidity, is_opened, days_since_manufacture } = req.body;

    const pythonProcess = spawn("python", ["ollama/food_expiry_prediction/ml_api.py", food_type, temperature, humidity, is_opened, days_since_manufacture]);

    pythonProcess.stdout.on("data", (data) => {
        try {
            const prediction = parseFloat(data.toString().trim()); // Convert float32 to native float
            res.json({ expiry_days: prediction });
        } catch (error) {
            res.status(500).json({ error: "Failed to parse prediction output" });
        }
    });

    pythonProcess.stderr.on("data", (data) => {
        res.status(500).json({ error: "Failed to get prediction from ML model", details: data.toString() });
    });
});

module.exports = router;
