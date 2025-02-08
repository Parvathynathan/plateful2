const { Ollama } = require("ollama");
const ollama = new Ollama();
const DonationAllocated = require("../models/Donation").Donation;
const { Shortage, Donatefree } = require("../models/Donation");

/**
 * Allocates food donations based on past shortages.
 * @param {string} foodType - Type of food being donated.
 * @param {string} location - Location of the donor.
 * @returns {Promise<Object>} - Best food bank allocation in JSON format.
 */// Function to allocate food donations based on nearby food banks
async function allocateFood(foodType, location) {
  try {
    // Fetch food banks that accept this food type
    const foodBanks = await DonationAllocated.find({ foodType });

    let foodBankData = "";
    foodBanks.forEach((fb) => {
      foodBankData += `Food Bank: ${fb.foodBank}, Location: ${fb.location}\n`;
    });

    const prompt = `
      You are an AI optimizing food allocation. Given a new donation of:
      - Food Type: ${foodType}
      - Location: ${location}

      Here are available food banks:
      ${foodBankData}

      Choose the best recipient based on:
      1. **Nearest Location** to minimize transport costs
      2. **Food Bank Capacity** (prioritize those with higher demand)
      3. **Perishable Items** should be delivered first

      Return the best food bank in JSON format:
      { "recipient": "Food Bank Name", "address": "Location", "priority": "High/Medium/Low" }
    `;

    console.log("📝 AI Prompt:", prompt);

    const response = await ollama.generate({ model: "mistral", prompt });

    console.log("🤖 AI Raw Response:", response);

    const textResponse = response.response.trim();
    console.log("📝 AI Text Response:", textResponse);

    const jsonMatch = textResponse.match(/\{.*\}/s);
    if (!jsonMatch) {
      throw new Error("AI response does not contain valid JSON.");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("❌ AI Allocation Error:", error);
    return { error: "AI Allocation Failed" };
  }
}


/**
 * Predicts how long food can be preserved before becoming unsafe.
 * @param {string} foodType - Type of food.
 * @param {string} cookingTime - Time food was cooked.
 * @returns {Promise<Object>} - Prediction in JSON format.
 */
async function predictFoodPreservation(foodType, cookingTime) {
  try {
    const prompt = `
      The food '${foodType}' was cooked at '${cookingTime}'. 
      Based on food safety guidelines, provide a preservation duration.
      
      Return JSON:
      { "food": "${foodType}", "safe_duration": "XX hours/days", "reason": "Explanation" }
    `;
    
    console.log("📝 AI Prompt for Food Preservation:", prompt);
    const response = await ollama.generate({ model: "mistral", prompt });
    
    return extractJsonFromResponse(response);
  } catch (error) {
    console.error("❌ AI Prediction Error:", error);
    return { error: "Food preservation prediction failed" };
  }
}

/**
 * Allocates free donations without shortage-based prioritization.
 * @param {string} foodType - Type of food being donated.
 * @param {string} location - Location of the donor.
 * @returns {Promise<Object>} - Best recipient in JSON format.
 */
async function donateFree(foodType, location) {
  try {
    const foodBanks = await Donatefree.find({ foodType });
    
    if (!foodBanks.length) {
      return { error: "No food banks found for this food type." };
    }
    
    const foodBankData = foodBanks.map(fb => `Food Bank: ${fb.foodBank}, Location: ${fb.location}`).join("\n");
    
    const prompt = `
      You are an AI optimizing food donations. Given a new donation of:
      - Food Type: ${foodType}
      - Location: ${location}

      Available food banks:
      ${foodBankData}

      Prioritize:
      1. Nearest Location
      2. Availability of food banks

      Return JSON:
      { "recipient": "Food Bank Name", "address": "Location", "priority": "Medium/Low" }
    `;
    
    console.log("📝 AI Prompt for Donate Free:", prompt);
    const response = await ollama.generate({ model: "mistral", prompt });
    
    return extractJsonFromResponse(response);
  } catch (error) {
    console.error("❌ AI Free Donation Error:", error);
    return { error: "Free donation allocation failed" };
  }
}

/**
 * Extracts JSON response from AI output.
 * @param {Object} response - AI response object.
 * @returns {Object} - Parsed JSON output or error message.
 */
function extractJsonFromResponse(response) {
  try {
    const textResponse = response?.response?.trim() || "";
    console.log("📝 AI Text Response:", textResponse);
    
    const jsonMatch = textResponse.match(/\{.*\}/s);
    if (!jsonMatch) throw new Error("Invalid JSON format");
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("❌ JSON Parsing Error:", error);
    return { error: "Failed to parse AI response" };
  }
}

module.exports = { allocateFood, predictFoodPreservation, donateFree };
