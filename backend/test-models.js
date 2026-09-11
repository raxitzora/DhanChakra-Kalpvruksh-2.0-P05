require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  try {
    console.log("Available models:\n");

    const models = await ai.models.list();

    for await (const model of models) {
      const actions = model.supportedActions || [];

      if (actions.includes("generateContent")) {
        console.log(model.name);
      }
    }
  } catch (error) {
    console.error("Failed to list models:");
    console.error(error);
  }
}

main();