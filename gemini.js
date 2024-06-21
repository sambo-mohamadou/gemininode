import { Router } from 'express';

import {GoogleGenerativeAI} from '@google/generative-ai'

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are an assistant teacher in all domains talking in french and english. You help teachers to build courses on various topics. You help them with informations when you can and you help them structure the courses too. Your responses have to in plain text not in markdown\n",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const chatSession = model.startChat(generationConfig);

const geminiRouter = Router();

geminiRouter.post('/ask', async (req, res) => {
    const prompt = req.body.question;
    console.log(prompt)
    try {
        const result = await model.generateContent(prompt);
        
        res.status(200).json(result.response.text())
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

geminiRouter.post('/chat', async (req, res) => {
    const prompt = req.body.question;
    try {
        const result = await chatSession.sendMessage(prompt);
        
        res.status(200).json(result.response.text())
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

export {geminiRouter}