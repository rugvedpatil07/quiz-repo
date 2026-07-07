import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
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

    // Fetch all attempts for the user
    const attempts = await prisma.attempt.findMany({
      where: { userId: user.id },
      include: { quiz: true },
      orderBy: { createdAt: "asc" }
    });

    // Group by quizId and only keep the FIRST attempt
    const firstAttemptsMap = new Map();
    attempts.forEach((attempt: any) => {
      if (!firstAttemptsMap.has(attempt.quizId)) {
        firstAttemptsMap.set(attempt.quizId, attempt);
      }
    });

    const firstAttempts = Array.from(firstAttemptsMap.values());

    let totalXP = 0;
    const categoryStats: Record<string, { totalScore: number; maxScore: number; count: number }> = {};
    const timelineMap: Record<string, number> = {};
    
    // Calculate Official Stats from FIRST attempts only
    firstAttempts.forEach((attempt: any) => {
      const quiz = attempt.quiz;
      const totalQuestions = quiz?._count?.questions || quiz?.questions?.length || 0;
      const xpEarned = attempt.score * 10;
      
      // Calculate XP
      totalXP += xpEarned;
      
      // Calculate Timeline (last 30 days roughly)
      const dateStr = new Date(attempt.createdAt).toISOString().split('T')[0];
      timelineMap[dateStr] = (timelineMap[dateStr] || 0) + xpEarned;

      // Category Stats
      if (quiz?.category) {
        if (!categoryStats[quiz.category]) {
          categoryStats[quiz.category] = { totalScore: 0, maxScore: 0, count: 0 };
        }
        categoryStats[quiz.category].totalScore += attempt.score;
        categoryStats[quiz.category].maxScore += totalQuestions;
        categoryStats[quiz.category].count += 1;
      }
    });

    // Create Recent Activity from ALL attempts
    // If it's the first attempt, XP is awarded. If it's a retake, XP is 0.
    const recentAttempts = [...attempts].sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).map((attempt: any) => {
      const quiz = attempt.quiz;
      const totalQuestions = quiz?._count?.questions || quiz?.questions?.length || 0;
      
      // Check if this specific attempt ID matches the first attempt ID for this quiz
      const isFirstAttempt = firstAttemptsMap.get(attempt.quizId)?.id === attempt.id;
      const xpEarned = isFirstAttempt ? attempt.score * 10 : 0;

      return {
        id: attempt.id,
        quizTitle: quiz?.title || "Unknown Quiz",
        score: attempt.score,
        totalQuestions,
        xpEarned,
        date: attempt.createdAt,
        isRetake: !isFirstAttempt
      };
    });

    // Format Categories
    const categories = Object.keys(categoryStats).map(cat => ({
      name: cat,
      percentage: Math.round((categoryStats[cat].totalScore / Math.max(1, categoryStats[cat].maxScore)) * 100),
      totalQuizzes: categoryStats[cat].count
    }));

    const strongestCategory = categories.length > 0 
      ? categories.reduce((prev, current) => (prev.percentage > current.percentage) ? prev : current)
      : null;

    const weakestCategory = categories.length > 0 
      ? categories.reduce((prev, current) => (prev.percentage < current.percentage) ? prev : current)
      : null;

    // Format Timeline
    const timeline = Object.keys(timelineMap)
      .sort() // ascending order by date
      .map(date => ({
        date,
        xp: timelineMap[date]
      }));

    // If timeline is empty, provide a dummy one so the chart doesn't crash
    if (timeline.length === 0) {
      timeline.push({ date: new Date().toISOString().split('T')[0], xp: 0 });
    }

    return NextResponse.json({
      timeline,
      categories,
      strongestCategory,
      weakestCategory,
      totalAttempts: firstAttempts.length,
      totalXP,
      recentAttempts: recentAttempts.slice(0, 10) // Only send 10 recent
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
