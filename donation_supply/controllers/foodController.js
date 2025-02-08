const { Ollama } = require("ollama");
const ollama = new Ollama();
const { donateFree } = require("../models/Donation").Donatefree; 

// Function to predict food preservation duration
const preserveFood = async (req, res) => {
  try {
    const { foodType, cookingTime } = req.body;

    // Validate input
    if (!foodType || !cookingTime) { 
      return res.status(400).json({ error: "Missing required fields: foodType or cookingTime" });
    }

    // AI Prompt
    const prompt = `
      You are an AI that predicts food preservation time based on cooking time.
      - Food Type: ${foodType}
      - Cooking Time: ${cookingTime}

      Estimate how long this food will remain safe to eat under:
      1. **Room Temperature**
      2. **Refrigerated Conditions**

      Return the result in JSON format:
      {
        "room_temperature": "X hours",
        "refrigerated": "Y days"
      }
    `;

    console.log("📝 AI Prompt:", prompt);

    // Call Ollama AI model
    const response = await ollama.generate({ model: "mistral", prompt });

    console.log("🤖 AI Raw Response:", response);

    // Extract JSON response
    const textResponse = response.response.trim();
    const jsonMatch = textResponse.match(/\{.*\}/s); // Match JSON format

    if (!jsonMatch) {
      throw new Error("AI response does not contain valid JSON.");
    }

    const jsonData = JSON.parse(jsonMatch[0]); // Convert to JSON object

    res.json({
      message: "Food preservation prediction successful!",
      preservation: jsonData,
    });

  } catch (error) {
    console.error("❌ Food Preservation Error:", error);
    res.status(500).json({ error: "Failed to predict food preservation time" });
  }
};

// Function to handle free donations
const donateFreeController = async (req, res) => {
  try {
    const { foodType, location } = req.body;

    if (!foodType || !location) {
      return res.status(400).json({ error: "Food type and location are required." });
    }

    // Call the function to process donation
    const donationResult = await donateFree(foodType, location);

    res.json({
      message: "Free donation processed successfully!",
      result: donationResult,
    });

  } catch (error) {
    console.error("❌ Free Donation Error:", error);
    res.status(500).json({ error: "Failed to process free donation." });
  }
};

// Correctly export both functions
module.exports = { preserveFood, donateFreeController };
