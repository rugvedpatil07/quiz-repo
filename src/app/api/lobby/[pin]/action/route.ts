import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ pin: string }> }) {
  try {
    const { pin } = await params;
    const body = await req.json();
    const { action, playerId, optionId, timeElapsed } = body;

    const lobby = await prisma.lobby.findUnique({
      where: { pin },
      include: {
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

    // Determine if requester is the host
    const session = await getServerSession(authOptions);
    const userId = session?.user ? parseInt((session.user as any).id) : null;
    const isHost = userId === lobby.hostId;

    // --- HOST ACTIONS ---
    if (action === "START_GAME" && isHost) {
      await prisma.lobby.update({
        where: { id: lobby.id },
        data: {
          state: "QUESTION",
          currentQuestionIndex: 0,
          questionStartTime: new Date()
        }
      });
      
      // Reset all players hasAnsweredCurrent
      await prisma.lobbyPlayer.updateMany({
        where: { lobbyId: lobby.id },
        data: { hasAnsweredCurrent: false }
      });
      return NextResponse.json({ success: true });
    }

    if (action === "SHOW_LEADERBOARD" && isHost) {
      await prisma.lobby.update({
        where: { id: lobby.id },
        data: { state: "LEADERBOARD" }
      });
      return NextResponse.json({ success: true });
    }

    if (action === "NEXT_QUESTION" && isHost) {
      const nextIndex = lobby.currentQuestionIndex + 1;
      if (nextIndex >= lobby.quiz.questions.length) {
        // Game over
        await prisma.lobby.update({
          where: { id: lobby.id },
          data: { state: "FINISHED" }
        });
        
        // At this point we could save `Attempts` to the user's permanent profile if they are logged in,
        // but for Kahoot style, it's mostly ephemeral. We'll leave it as just finishing the lobby.
      } else {
        await prisma.lobby.update({
          where: { id: lobby.id },
          data: {
            state: "QUESTION",
            currentQuestionIndex: nextIndex,
            questionStartTime: new Date()
          }
        });
        
        // Reset player answered state
        await prisma.lobbyPlayer.updateMany({
          where: { lobbyId: lobby.id },
          data: { hasAnsweredCurrent: false }
        });
      }
      return NextResponse.json({ success: true });
    }

    // --- PLAYER ACTIONS ---
    if (action === "SUBMIT_ANSWER" && playerId) {
      if (lobby.state !== "QUESTION") {
        return NextResponse.json({ error: "Not currently accepting answers" }, { status: 400 });
      }

      const player = await prisma.lobbyPlayer.findUnique({ where: { id: parseInt(playerId) } });
      if (!player || player.lobbyId !== lobby.id) {
        return NextResponse.json({ error: "Player not found in this lobby" }, { status: 404 });
      }

      if (player.hasAnsweredCurrent) {
        return NextResponse.json({ error: "Already answered" }, { status: 400 });
      }

      // Check if option is correct
      const currentQuestion = lobby.quiz.questions[lobby.currentQuestionIndex];
      const option = currentQuestion.options.find(o => o.id === parseInt(optionId));
      
      let pointsAwarded = 0;
      if (option && option.isCorrect) {
        // Calculate points based on speed (Kahoot style)
        // Max points = 1000. Reduces based on time taken.
        const timeLimit = currentQuestion.timeLimit || lobby.quiz.timeLimit || 20;
        const timeTaken = parseFloat(timeElapsed) || 0; // in seconds
        
        if (timeTaken <= timeLimit) {
          // Point formula: 500 + (1 - (timeTaken / timeLimit)) * 500
          pointsAwarded = Math.round(500 + (1 - (timeTaken / timeLimit)) * 500);
        } else {
          pointsAwarded = 500; // base points for correct but late
        }
      }

      await prisma.lobbyPlayer.update({
        where: { id: player.id },
        data: {
          hasAnsweredCurrent: true,
          score: player.score + pointsAwarded
        }
      });

      return NextResponse.json({ success: true, pointsAwarded, isCorrect: option?.isCorrect || false });
    }

    return NextResponse.json({ error: "Invalid action or permissions" }, { status: 400 });

  } catch (error) {
    console.error("Lobby Action Error:", error);
    return NextResponse.json(
      { error: "Failed to perform action" },
      { status: 500 }
    );
  }
}
