import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ Use your API key
const genAI = new GoogleGenerativeAI("AIzaSyDjzzC9NNvbhQYDE32RygD3amaF1N9Zyqo");

// ✅ Use the latest working model
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

// 🧩 POST endpoint for prompt engineering
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
