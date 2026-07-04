import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import QuizClient from "./QuizClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function TakeQuiz({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: parseInt(id) },
    include: {
      questions: {
        include: {
          options: {
            select: {
              id: true,
              text: true
            }
          }
        }
      }
    }
  });

  if (!quiz) {
    notFound();
  }

  return (
    <div className="container min-h-screen" style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <QuizClient quiz={quiz} />
    </div>
  );
}
