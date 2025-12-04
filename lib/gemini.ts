import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

export const analyzeContent = async (content: string, prompt: string) => {
  try {
    const model = getGeminiModel();
    const result = await model.generateContent(`${prompt}\n\nContent to analyze:\n${content}`);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze content with Gemini AI');
  }
};
