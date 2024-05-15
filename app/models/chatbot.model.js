const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

class GenerativeModel {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateContent(prompt, imagePaths) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const imageParts = imagePaths.map((path) =>
      this.fileToGenerativePart(path)
    );

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = await response.text();
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
