import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ pin: string }> }) {
  try {
    const { pin } = await params;

    const lobby = await prisma.lobby.findUnique({
      where: { pin },
      include: {
        players: {
          orderBy: { score: "desc" }
        },
        quiz: {
          include: {
            questions: {
              include: {
                options: true
              }
            }
          }
        }
      }
    });

    if (!lobby) {
      return NextResponse.json({ error: "Lobby not found" }, { status: 404 });
    }

    // Prepare the state response based on the current state
    const currentQuestion = lobby.quiz.questions[lobby.currentQuestionIndex];
    
    // We want to hide the correct answer from the players while the question is active.
    // The host might need it, but for simplicity we will strip `isCorrect` unless the state is LEADERBOARD.
    let questionData = null;
    if (currentQuestion && (lobby.state === "QUESTION" || lobby.state === "LEADERBOARD")) {
      questionData = {
        id: currentQuestion.id,
        text: currentQuestion.text,
        timeLimit: currentQuestion.timeLimit || lobby.quiz.timeLimit || 20,
        options: currentQuestion.options.map(o => ({
          id: o.id,
          text: o.text,
          // Only reveal correct answers during leaderboard/results
          isCorrect: lobby.state === "LEADERBOARD" ? o.isCorrect : undefined
        }))
      };
    }

    return NextResponse.json({
      state: lobby.state,
      currentQuestionIndex: lobby.currentQuestionIndex,
      totalQuestions: lobby.quiz.questions.length,
      questionStartTime: lobby.questionStartTime,
      players: lobby.players.map(p => ({
        id: p.id,
        nickname: p.nickname,
        score: p.score,
        hasAnsweredCurrent: p.hasAnsweredCurrent
      })),
      question: questionData,
      quizTitle: lobby.quiz.title
    });

  } catch (error) {
    console.error("Lobby State Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch lobby state" },
      { status: 500 }
    );
  }
}
