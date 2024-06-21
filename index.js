import express from 'express';
import cors from 'cors';

import { geminiRouter } from './gemini.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1/gemini', geminiRouter)

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})