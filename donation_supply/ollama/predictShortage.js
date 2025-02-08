const { spawn } = require("child_process");

async function predictShortage(foodType, location) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn("python", ["./ai/python-models/predict.py", foodType, location]);

        let result = "";
        pythonProcess.stdout.on("data", (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`Error: ${data}`);
            reject(data.toString());
        });

        pythonProcess.on("close", () => {
            try {
                resolve(JSON.parse(result.trim()));
            } catch (e) {
                reject("Invalid response from AI model.");
            }
        });
    });
}

module.exports = { predictShortage };
