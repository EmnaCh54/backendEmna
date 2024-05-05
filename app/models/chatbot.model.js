// models/generativeModel.js
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Classe représentant le modèle de l'API Generative AI
class GenerativeModel {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(AIzaSyCrdB_ufr_SaBu_fapwT - apdTzwEkEFd1k);
  }

  async generateContent(prompt, imagePaths) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const imageParts = imagePaths.map((path) =>
      this.fileToGenerativePart(path)
    );

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    return text;
  }

  fileToGenerativePart(path, mimeType = "image/jpeg") {
    const data = fs.readFileSync(path);
    return {
      inlineData: {
        data: Buffer.from(data).toString("base64"),
        mimeType,
      },
    };
  }
}

module.exports = GenerativeModel;
