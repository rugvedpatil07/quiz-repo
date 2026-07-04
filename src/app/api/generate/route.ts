import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const systemPrompt = `You are an expert quiz creator. The user will provide a prompt. 
You must generate a quiz based on the prompt.
Return ONLY valid JSON, exactly matching this schema without any markdown formatting like \`\`\`json:
{
  "title": "String, a catchy title for the quiz",
  "description": "String, a short description",
  "category": "String, ideally matching an existing category like 'Technology', 'Science', 'History', etc.",
  "subcategory": "String, an appropriate subcategory",
  "questions": [
    {
      "text": "String, the question text",
      "options": [
        { "text": "String, option 1", "isCorrect": boolean },
        { "text": "String, option 2", "isCorrect": boolean }
        // Ensure there is exactly ONE option where isCorrect is true, and others are false. Provide 4 options total per question if possible.
      ]
    }
  ]
}
Make sure your entire response can be successfully parsed by JSON.parse().`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "user", parts: [{ text: prompt }] },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "";
    
    // Safety fallback in case it still returned markdown
    const jsonStr = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();

    const parsedJson = JSON.parse(jsonStr);

    return NextResponse.json(parsedJson);
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
