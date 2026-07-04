import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt((session.user as any).id);

    // Fetch all attempts for the user including the associated quiz
    const attempts = await prisma.attempt.findMany({
      where: { userId },
      include: {
        quiz: {
          select: {
            title: true,
            category: true,
            questions: {
              select: { id: true }
            }
          }
        }
      },
      orderBy: { createdAt: "asc" }
    });

    // 1. Timeline Data (Last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Create a map of the last 30 days
    const timelineMap: Record<string, { daily: number, cumulative: number }> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      timelineMap[dateStr] = { daily: 0, cumulative: 0 };
    }

    // Aggregate XP per day and get totalXP
    let totalXP = 0;
    
    // First, add up all XP from attempts before the 30 day window to set the baseline
    const baselineXP = attempts
      .filter(a => a.createdAt < thirtyDaysAgo)
      .reduce((sum, a) => sum + (a.score * 100), 0);

    let runningXP = baselineXP;

    attempts.forEach(attempt => {
      const earnedXP = attempt.score * 100; // Convert score to XP
      totalXP += earnedXP;
      
      const dateStr = attempt.createdAt.toISOString().split('T')[0];
      if (timelineMap[dateStr] !== undefined) {
        timelineMap[dateStr].daily += earnedXP; 
      }
    });

    // Calculate cumulative XP
    Object.keys(timelineMap).forEach(date => {
      runningXP += timelineMap[date].daily;
      timelineMap[date].cumulative = runningXP;
    });

    const timeline = Object.keys(timelineMap).map(date => ({
      date,
      xp: timelineMap[date].cumulative, // Return cumulative XP for the graph
      dailyXp: timelineMap[date].daily
    }));

    // 2. Category Performance
    const categoryStats: Record<string, { totalPossible: number, totalCorrect: number }> = {};
    
    attempts.forEach(attempt => {
      const cat = attempt.quiz.category || "Uncategorized";
      if (!categoryStats[cat]) {
        categoryStats[cat] = { totalPossible: 0, totalCorrect: 0 };
      }
      
      categoryStats[cat].totalCorrect += attempt.score;
      // The total possible score for an attempt is the number of questions in the quiz
      categoryStats[cat].totalPossible += attempt.quiz.questions.length;
    });

    const categories = Object.keys(categoryStats).map(cat => {
      const stats = categoryStats[cat];
      const percentage = stats.totalPossible > 0 
        ? Math.round((stats.totalCorrect / stats.totalPossible) * 100) 
        : 0;
        
      return {
        name: cat,
        percentage,
        totalQuizzes: attempts.filter(a => (a.quiz.category || "Uncategorized") === cat).length
      };
    }).sort((a, b) => b.percentage - a.percentage);

    const strongestCategory = categories.length > 0 ? categories[0] : null;
    const weakestCategory = categories.length > 0 ? categories[categories.length - 1] : null;

    // 3. Recent Attempts
    const recentAttempts = [...attempts]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map(a => ({
        id: a.id,
        quizTitle: a.quiz.title,
        score: a.score,
        totalQuestions: a.quiz.questions.length,
        xpEarned: a.score * 100,
        date: a.createdAt.toISOString()
      }));

    return NextResponse.json({
      timeline,
      categories,
      strongestCategory,
      weakestCategory,
      totalAttempts: attempts.length,
      totalXP,
      recentAttempts
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
