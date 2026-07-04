import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    const quizId = parseInt(id);
    const body = await req.json();
    const { answers } = body; // { [questionId]: optionId }

    if (!answers) {
      return new NextResponse("Missing answers", { status: 400 });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });

    if (!quiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    let score = 0;
    quiz.questions.forEach((q) => {
      const selectedOptionId = answers[q.id];
      const correctOption = q.options.find(o => o.isCorrect);
      if (correctOption && selectedOptionId === correctOption.id) {
        score += 1;
      }
    });

    const attemptAnswers = quiz.questions.map((q) => ({
      questionId: q.id,
      optionId: answers[q.id] || null
    }));

    const attempt = await prisma.attempt.create({
      data: {
        userId: parseInt((session.user as any).id),
        quizId,
        score,
        answers: {
          create: attemptAnswers
        }
      }
    });

    return NextResponse.json({ attemptId: attempt.id, score });
  } catch (error) {
    console.error("QUIZ_SUBMIT_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
