import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CategoryFilter from "@/components/CategoryFilter";
import QuizCard from "@/components/QuizCard";

export const dynamic = 'force-dynamic';

export default async function Quizzes({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  const resolvedSearchParams = await searchParams;
  const searchQuery = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : undefined;
  const categoryQuery = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;
  const subcategoryQuery = typeof resolvedSearchParams.subcategory === 'string' ? resolvedSearchParams.subcategory : undefined;

  const whereClause: any = {};
  
  if (searchQuery) {
    whereClause.OR = [
      { title: { contains: searchQuery } },
      { description: { contains: searchQuery } },
    ];
  }
  
  if (categoryQuery) {
    whereClause.category = categoryQuery;
  }
  
  if (subcategoryQuery) {
    whereClause.subcategory = subcategoryQuery;
  }

  const quizzes = await prisma.quiz.findMany({
    where: whereClause,
    include: {
      creator: {
        select: { name: true }
      },
      _count: {
        select: { questions: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Fetch the first attempt scores for the logged-in user
  let userFirstAttempts: Record<number, { score: number }> = {};
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user) {
      const attempts = await prisma.attempt.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "asc" }
      });
      attempts.forEach((attempt: any) => {
        if (!userFirstAttempts[attempt.quizId]) {
          userFirstAttempts[attempt.quizId] = { score: attempt.score };
        }
      });
    }
  }

  return (
    <div className="container min-h-screen" style={{ padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 className="heading-xl" style={{ margin: 0 }}>
          {searchQuery ? `Search Results for "${searchQuery}"` : "Available Quizzes"}
        </h1>
        {searchQuery && (
          <Link href="/quizzes" className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            Clear Search
          </Link>
        )}
      </div>
      
      <CategoryFilter />
      
      {quizzes.length === 0 ? (
        <div className="glass-panel animate-fade-in-up" style={{ textAlign: 'center', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>No Quizzes Found</h2>
          <p className="text-muted" style={{ marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            {searchQuery ? `We couldn't find any quizzes matching "${searchQuery}". Try adjusting your search terms.` : "No quizzes available yet. Be the first to create an amazing quiz!"}
          </p>
          <Link href="/create" className="btn-primary" style={{ padding: '0.8rem 2.5rem' }}>Create a Quiz</Link>
        </div>
      ) : (
        <div className="grid-cards">
          {quizzes.map((quiz: any, index: number) => (
            <div key={quiz.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
              <QuizCard 
                quiz={quiz} 
                attempt={userFirstAttempts[quiz.id] ? { score: userFirstAttempts[quiz.id].score } : undefined} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
