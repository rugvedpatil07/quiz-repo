import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function QuizResults({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/login");
  }

  const { id } = await params;
  const attempt = await prisma.attempt.findUnique({
    where: { id: parseInt(id) },
    include: {
      answers: true,
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

  if (!attempt || attempt.userId !== parseInt((session.user as any).id)) {
    notFound();
  }

  const percentage = Math.round((attempt.score / attempt.quiz.questions.length) * 100);

  return (
    <div className="container min-h-screen flex-center" style={{ padding: '2rem 1.5rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <h2 className="heading-lg">Quiz Results</h2>
        <h3 className="heading-xl" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{attempt.quiz.title}</h3>
        
        <div style={{ margin: '3rem 0' }}>
          <div style={{ 
            width: '150px', height: '150px', 
            borderRadius: '50%', 
            background: `conic-gradient(var(--primary-color) ${percentage}%, rgba(255,255,255,0.1) 0)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto',
            position: 'relative'
          }}>
            <div style={{
              width: '120px', height: '120px',
              borderRadius: '50%',
              background: 'var(--bg-gradient-start)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.5rem', fontWeight: 'bold'
            }}>
              {percentage}%
            </div>
          </div>
        </div>

        <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          You scored <strong style={{ color: 'var(--text-primary)' }}>{attempt.score}</strong> out of <strong style={{ color: 'var(--text-primary)' }}>{attempt.quiz.questions.length}</strong> correct!
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <Link href="/quizzes" className="btn-secondary">
            Browse More Quizzes
          </Link>
          <Link href={`/take/${attempt.quizId}`} className="btn-primary">
            Retake Quiz
          </Link>
        </div>

        <div style={{ textAlign: 'left', marginTop: '2rem' }}>
          <h3 className="heading-md" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Detailed Review</h3>
          {attempt.quiz.questions.map((q, index) => {
            const attemptAnswer = attempt.answers.find((a: any) => a.questionId === q.id);
            const selectedOptionId = attemptAnswer?.optionId;
            const correctOption = q.options.find((o: any) => o.isCorrect);
            const isCorrect = selectedOptionId === correctOption?.id;

            return (
              <div key={q.id} style={{ marginBottom: '2rem', padding: '1.5rem', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${isCorrect ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}` }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }}>Q{index + 1}.</span>
                  {q.text}
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {q.options.map((opt: any) => {
                    const isSelected = selectedOptionId === opt.id;
                    const isActualCorrect = opt.isCorrect;
                    
                    let bg = 'rgba(255,255,255,0.05)';
                    let border = '1px solid var(--glass-border)';
                    let icon = null;

                    if (isActualCorrect) {
                      bg = 'rgba(34, 197, 94, 0.1)';
                      border = '1px solid rgba(34, 197, 94, 0.5)';
                      icon = <span style={{ color: '#22c55e', marginLeft: 'auto', fontSize: '0.9rem', fontWeight: 600 }}>✓ Correct Answer</span>;
                    } else if (isSelected && !isActualCorrect) {
                      bg = 'rgba(239, 68, 68, 0.1)';
                      border = '1px solid rgba(239, 68, 68, 0.5)';
                      icon = <span style={{ color: '#ef4444', marginLeft: 'auto', fontSize: '0.9rem', fontWeight: 600 }}>✗ Your Answer</span>;
                    }

                    return (
                      <div key={opt.id} style={{ 
                        padding: '0.75rem 1rem', 
                        borderRadius: '8px', 
                        backgroundColor: bg, 
                        border,
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <span style={{ fontWeight: isSelected || isActualCorrect ? 600 : 400 }}>{opt.text}</span>
                        {icon}
                      </div>
                    );
                  })}
                </div>
                {!selectedOptionId && (
                  <div style={{ marginTop: '1rem', color: '#f97316', fontSize: '0.9rem', fontWeight: 500 }}>
                    ⚠ You did not answer this question (Time out).
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
