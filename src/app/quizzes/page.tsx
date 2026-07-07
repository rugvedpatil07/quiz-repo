import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CategoryFilter from "@/components/CategoryFilter";
import HostLiveButton from "@/components/HostLiveButton";

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
            <div 
              key={quiz.id} 
              className="glass-panel quiz-card animate-fade-in-up" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                position: 'relative', 
                overflow: 'hidden', 
                padding: '1.75rem',
                animationDelay: `${index * 50}ms` 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="badge badge-primary">Quiz</span>
                  {userFirstAttempts[quiz.id] && (
                    <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.25)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Score: {userFirstAttempts[quiz.id].score}/{quiz._count.questions}
                    </span>
                  )}
                </div>
                {quiz.timeLimit ? (
                  <span className="badge badge-outline" style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {Math.floor(quiz.timeLimit / 60)}:{String(quiz.timeLimit % 60).padStart(2, '0')}
                  </span>
                ) : null}
              </div>
              
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.3 }}>{quiz.title}</h3>
              <p className="text-muted" style={{ flex: 1, marginBottom: '1.5rem', fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.6 }}>
                {quiz.description || "No description provided."}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #818cf8, #c084fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {(quiz.creator?.name?.[0] || 'U').toUpperCase()}
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{quiz.creator?.name || 'Unknown'}</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  {quiz._count.questions} Qs
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href={`/take/${quiz.id}`} className={userFirstAttempts[quiz.id] ? "btn-secondary" : "btn-primary"} style={{ flex: 1, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.8rem' }}>
                  {userFirstAttempts[quiz.id] ? "Retake" : "Solo"}
                  {userFirstAttempts[quiz.id] ? (
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  )}
                </Link>
                <div style={{ flex: 1 }}>
                  <HostLiveButton quizId={quiz.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
