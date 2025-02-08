const { getBiogasSuggestion } = require("../ollama/ollamaService");

async function biogasHandler(req, res) {
    const { foodType, expiryDays } = req.body;

    if (!foodType || expiryDays === undefined) {
        return res.status(400).json({ error: "Missing foodType or expiryDays" });
    }

    if (expiryDays >= 0) {
        return res.json({ message: `✅ ${foodType} is still fresh. No need for biogas conversion.` });
    }

    const suggestion = await getBiogasSuggestion(foodType);
    res.json({ foodType, suggestion });
}

module.exports = { biogasHandler };
