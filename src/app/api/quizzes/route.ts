import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, description, questions, timeLimit, category, subcategory } = body;

    if (!title || !questions || !questions.length) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        category,
        subcategory,
        timeLimit: timeLimit ? parseInt(timeLimit) : null,
        creatorId: parseInt((session.user as any).id),
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            imageUrl: q.imageUrl || null,
            timeLimit: q.timeLimit ? parseInt(q.timeLimit) : null,
            options: {
              create: q.options.map((o: any) => ({
                text: o.text,
                isCorrect: o.isCorrect
              }))
            }
          }))
        }
      }
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("QUIZ_CREATE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    let whereClause = {};
    if (query) {
      whereClause = {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { category: { contains: query } }
        ]
      };
    }

    const quizzes = await prisma.quiz.findMany({
      where: whereClause,
      include: {
        creator: {
          select: { name: true }
        },
        _count: {
          select: { questions: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(quizzes);
  } catch (error: any) {
    console.error("QUIZ_GET_ERROR", error);
    return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
  }
}
