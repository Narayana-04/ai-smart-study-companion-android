
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const chatWithGemini = async (messages: { role: string, text: string }[]) => {
  const ai = getAI();
  const lastMessage = messages[messages.length - 1].text;
  const history = messages.slice(0, -1).map(m => ({
    role: m.role,
    parts: [{ text: m.text }]
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: lastMessage }] }],
    config: {
      systemInstruction: "You are a senior engineering professor. Explain concepts clearly, using technical terms where appropriate, but keep explanations easy to understand for students. Use formatting like bold text and bullet points."
    }
  });

  return response.text || "I'm sorry, I couldn't process that.";
};

export const generateExamAnswer = async (topic: string, marks: number) => {
  const ai = getAI();
  const prompt = `Provide a comprehensive answer for the topic: "${topic}". This is a ${marks}-mark question for an engineering exam. Ensure the answer includes:
    1. Introduction/Definition
    2. Diagram Description (if applicable)
    3. Key Points/Working Principle
    4. Advantages/Disadvantages
    5. Conclusion. 
    Make it structured exactly like an exam sheet.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt
  });

  return response.text || "Failed to generate answer.";
};

export const generateNotes = async (topic: string) => {
  const ai = getAI();
  const prompt = `Generate structured study notes for: "${topic}". 
  Provide:
  - A short summary (2-3 sentences)
  - Key definitions
  - Bulleted key points
  - Important formulas if any.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt
  });

  return response.text || "Failed to generate notes.";
};

export const generateQuiz = async (topic: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 5 multiple choice questions about "${topic}" for engineering students. Return ONLY JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            answer: { type: Type.STRING, description: "The correct option text" }
          },
          required: ["question", "options", "answer"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error("Quiz parsing error", e);
    return [];
  }
};
