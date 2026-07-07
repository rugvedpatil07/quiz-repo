import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    const { id } = await params;
    const quizId = parseInt(id);

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId }
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const data = await req.json();
    const { answers } = data; // Record<number, number> (questionId -> optionId)

    if (!answers) {
      return NextResponse.json({ error: "No answers provided" }, { status: 400 });
    }

    let score = 0;
    const answerRecords: any[] = [];

    // Calculate score
    quiz.questions.forEach((question: any) => {
      const selectedOptionId = answers[question.id];
      const correctOption = question.options.find((opt: any) => opt.isCorrect);

      if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) {
        score += 1;
      }

      if (selectedOptionId) {
        answerRecords.push({
          questionId: question.id,
          optionId: selectedOptionId
        });
      }
    });

    // Save attempt
    const attempt = await prisma.attempt.create({
      data: {
        userId: user.id, // ID is usually a string in mock DB, but results page uses parseInt((session.user as any).id)
        quizId: quizId,
        score: score,
        answers: {
          create: answerRecords
        }
      }
    });

    // Revalidate paths to ensure the UI updates without requiring a manual refresh
    revalidatePath("/quizzes");
    revalidatePath("/dashboard");
    revalidatePath(`/results/${attempt.id}`);

    return NextResponse.json({ success: true, attemptId: attempt.id });
  } catch (error: any) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json({ error: "Failed to submit quiz" }, { status: 500 });
  }
}
