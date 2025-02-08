const axios = require("axios");

const OLLAMA_URL = "http://localhost:11434/api/generate"; // Ollama local API

/**
 * Calls the Mistral model via Ollama to generate a biogas suggestion.
 */
async function getBiogasSuggestion(foodType) {
    try {
        const response = await axios.post(OLLAMA_URL, {
            model: "mistral",
            prompt: `The food '${foodType}' has expired. Suggest a way to turn it into biogas efficiently.`,
            stream: false
        });

        return response.data.response.trim();
    } catch (error) {
        console.error("❌ Error calling Ollama:", error.message);
        return "⚠️ AI service unavailable. Please try again later.";
    }
}

module.exports = { getBiogasSuggestion };
