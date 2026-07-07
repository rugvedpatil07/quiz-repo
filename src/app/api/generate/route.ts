import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured. Please add a valid Gemini API key to your environment variables." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a multiple choice quiz based on this prompt: "${prompt}". Return it as structured data.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Title of the quiz" },
            description: { type: Type.STRING, description: "Short description of the quiz" },
            category: { type: Type.STRING, description: "Main category of the quiz (e.g., History, Science)" },
            subcategory: { type: Type.STRING, description: "Subcategory of the quiz" },
            questions: {
              type: Type.ARRAY,
              description: "List of multiple choice questions",
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING, description: "The question text" },
                  options: {
                    type: Type.ARRAY,
                    description: "List of 4 options for the question, where exactly one is correct.",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        text: { type: Type.STRING, description: "The option text" },
                        isCorrect: { type: Type.BOOLEAN, description: "Whether this option is the correct answer" }
                      },
                      required: ["text", "isCorrect"]
                    }
                  }
                },
                required: ["text", "options"]
              }
            }
          },
          required: ["title", "description", "category", "subcategory", "questions"]
        }
      }
    });

    const textResponse = response.text;
    if (!textResponse) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 500 });
    }

    const quizData = JSON.parse(textResponse);
    return NextResponse.json(quizData);
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    const message = error.message || "Failed to generate quiz";
    if (message.includes("API_KEY") || message.includes("401") || message.includes("403") || message.includes("PERMISSION")) {
      return NextResponse.json({ error: "Invalid Gemini API key. Please check your GEMINI_API_KEY in environment variables. Get a valid key from https://aistudio.google.com/apikey" }, { status: 500 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

