import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const quizzes = await prisma.quiz.findMany();
    
    if (query) {
      const filtered = quizzes.filter((q: any) => 
        q.title?.toLowerCase().includes(query.toLowerCase()) || 
        q.description?.toLowerCase().includes(query.toLowerCase())
      );
      return NextResponse.json(filtered);
    }
    
    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json({ error: "Failed to fetch quizzes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const host = req.headers.get("host");
    if (host && process.env.NODE_ENV !== "production") {
      process.env.NEXTAUTH_URL = `http://${host}`;
    }
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = await req.json();
    const { title, description, category, subcategory, timeLimit, questions } = data;

    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const processedQuestions = questions.map((q: any) => ({
      ...q,
      id: Math.floor(Math.random() * 1000000000),
      options: q.options?.map((o: any) => ({
        ...o,
        id: Math.floor(Math.random() * 1000000000)
      })) || []
    }));

    // Prepare quiz for the mock DB including the nested data expected by the frontend
    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        description,
        category,
        subcategory,
        timeLimit,
        questions: processedQuestions,
        creatorId: user.id,
        creator: {
          name: user.name || "Unknown User"
        },
        _count: {
          questions: questions.length
        }
      }
    });

    return NextResponse.json({ success: true, quiz: newQuiz });
  } catch (error: any) {
    console.error("Error creating quiz:", error);
    return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 });
  }
}
