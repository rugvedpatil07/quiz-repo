import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Group attempts by userId and sum their scores
    const groupedAttempts = await prisma.attempt.groupBy({
      by: ["userId"],
      _sum: {
        score: true,
      },
      orderBy: {
        _sum: {
          score: "desc",
        },
      },
      take: 50, // Get top 50
    });

    // 2. Fetch the corresponding user details
    const userIds = groupedAttempts.map((a) => a.userId);
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    // 3. Map the user details back to the aggregated scores and maintain the sorted order
    const leaderboard = groupedAttempts.map((aggr) => {
      const user = users.find((u) => u.id === aggr.userId);
      const rawScore = aggr._sum.score || 0;
      return {
        id: aggr.userId,
        name: user?.name || "Unknown User",
        image: user?.image || null,
        totalXP: rawScore * 100, // Using XP_MULTIPLIER (100)
      };
    });

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
