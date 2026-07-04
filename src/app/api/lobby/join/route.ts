import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { pin, nickname } = await req.json();
    
    if (!pin || !nickname) {
      return NextResponse.json({ error: "PIN and nickname are required" }, { status: 400 });
    }

    const lobby = await prisma.lobby.findUnique({
      where: { pin }
    });

    if (!lobby) {
      return NextResponse.json({ error: "Invalid PIN" }, { status: 404 });
    }

    if (lobby.state !== "WAITING") {
      return NextResponse.json({ error: "Game has already started" }, { status: 403 });
    }

    // Check if nickname is taken in this lobby
    const existingPlayer = await prisma.lobbyPlayer.findUnique({
      where: {
        lobbyId_nickname: {
          lobbyId: lobby.id,
          nickname
        }
      }
    });

    let player;
    if (existingPlayer) {
      // Rejoin as same nickname
      player = existingPlayer;
    } else {
      player = await prisma.lobbyPlayer.create({
        data: {
          lobbyId: lobby.id,
          nickname
        }
      });
    }

    return NextResponse.json({ player, lobby });

  } catch (error) {
    console.error("Join Lobby Error:", error);
    return NextResponse.json(
      { error: "Failed to join lobby" },
      { status: 500 }
    );
  }
}
