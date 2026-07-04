import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Generate a random 6-digit PIN
function generatePIN(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { quizId } = await req.json();
    if (!quizId) {
      return NextResponse.json({ error: "quizId is required" }, { status: 400 });
    }

    const hostId = parseInt((session.user as any).id);

    // Ensure the quiz exists
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(quizId) },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Generate a unique PIN
    let pin = generatePIN();
    let isUnique = false;
    
    // Safety loop to ensure uniqueness
    while (!isUnique) {
      const existing = await prisma.lobby.findUnique({ where: { pin } });
      if (!existing) {
        isUnique = true;
      } else {
        pin = generatePIN();
      }
    }

    const lobby = await prisma.lobby.create({
      data: {
        pin,
        quizId: quiz.id,
        hostId,
        state: "WAITING"
      }
    });

    return NextResponse.json({ lobby });

  } catch (error) {
    console.error("Create Lobby Error:", error);
    return NextResponse.json(
      { error: "Failed to create lobby" },
      { status: 500 }
    );
  }
}
