import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("admin_auth");

    if (!adminAuth || adminAuth.value !== "true") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch Users
    const users = await prisma.user.findMany() || [];
    
    // 2. Fetch Quizzes
    const quizzes = await prisma.quiz.findMany({
      include: {
        creator: { select: { name: true } },
        _count: { select: { questions: true } }
      }
    }) || [];

    // 3. Fetch all Attempts for XP calculation and stats
    const allAttempts = await prisma.attempt.findMany({
      include: { quiz: true },
      orderBy: { createdAt: "asc" }
    }) || [];

    // Group attempts by user to find their FIRST attempt per quiz
    const userFirstAttemptsMap: Record<string, Map<number, any>> = {};
    const quizAttemptCounts: Record<number, number> = {};
    let globalTotalXP = 0;
    
    const categoryPopularity: Record<string, number> = {};
    const timelineData: Record<string, number> = {};

    allAttempts.forEach((attempt: any) => {
      // Record total times a quiz was taken
      quizAttemptCounts[attempt.quizId] = (quizAttemptCounts[attempt.quizId] || 0) + 1;

      // Group for XP
      if (!userFirstAttemptsMap[attempt.userId]) {
        userFirstAttemptsMap[attempt.userId] = new Map();
      }
      const userMap = userFirstAttemptsMap[attempt.userId];
      
      if (!userMap.has(attempt.quizId)) {
        userMap.set(attempt.quizId, attempt);
        globalTotalXP += attempt.score * 10;
        
        // Track Category Popularity based on unique attempts (or all attempts, let's use all)
      }

      // Timeline tracking (Daily active attempts)
      const dateStr = new Date(attempt.createdAt).toISOString().split('T')[0];
      timelineData[dateStr] = (timelineData[dateStr] || 0) + 1;

      // Category Popularity tracking (count every attempt)
      const cat = attempt.quiz?.category;
      if (cat) {
        categoryPopularity[cat] = (categoryPopularity[cat] || 0) + 1;
      }
    });

    // Decorate Users with XP
    const enrichedUsers = users.map((u: any) => {
      const uMap = userFirstAttemptsMap[u.id];
      let xp = 0;
      if (uMap) {
        uMap.forEach(att => {
          xp += att.score * 10;
        });
      }
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        image: u.image,
        totalXP: xp,
        quizzesCreated: quizzes.filter((q: any) => q.creatorId === u.id).length
      };
    }).sort((a: any, b: any) => b.totalXP - a.totalXP); // Sort by XP descending

    // Decorate Quizzes with Play Count
    const enrichedQuizzes = quizzes.map((q: any) => {
      return {
        id: q.id,
        title: q.title,
        category: q.category,
        creatorName: q.creator?.name || "Unknown",
        questionsCount: q._count?.questions || q.questions?.length || 0,
        playCount: quizAttemptCounts[q.id] || 0,
        createdAt: q.createdAt
      };
    }).sort((a: any, b: any) => b.playCount - a.playCount);

    // Format Analytics
    const analytics = {
      totalUsers: users.length,
      totalQuizzes: quizzes.length,
      totalAttempts: allAttempts.length,
      globalTotalXP,
      categoryPopularity: Object.entries(categoryPopularity).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
      timeline: Object.entries(timelineData).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date))
    };

    return NextResponse.json({
      users: enrichedUsers,
      quizzes: enrichedQuizzes,
      analytics
    });

  } catch (error) {
    console.error("Admin API Error:", error);
    return NextResponse.json({ error: "Failed to fetch admin data" }, { status: 500 });
  }
}
