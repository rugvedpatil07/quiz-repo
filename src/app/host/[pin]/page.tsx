"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Option {
  id: number;
  text: string;
  isCorrect?: boolean;
}

interface Question {
  id: number;
  text: string;
  timeLimit: number;
  options: Option[];
}

interface Player {
  id: number;
  nickname: string;
  score: number;
  hasAnsweredCurrent: boolean;
}

interface LobbyState {
  state: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  questionStartTime: string;
  players: Player[];
  question: Question | null;
  quizTitle: string;
  error?: string;
}

export default function HostView() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const pin = params.pin as string;
  const [lobbyState, setLobbyState] = useState<LobbyState | null>(null);
  
  const [timeLeft, setTimeLeft] = useState(0);

  // Polling loop
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const fetchState = async () => {
      try {
        const res = await fetch(`/api/lobby/${pin}/state`);
        const data = await res.json();
        if (data.error) {
          console.error(data.error);
        } else {
          setLobbyState(data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchState(); // initial fetch
    const interval = setInterval(fetchState, 1500); // Poll every 1.5s
    return () => clearInterval(interval);
  }, [pin, status, router]);

  // Countdown timer loop for QUESTIONS
  useEffect(() => {
    if (lobbyState?.state === "QUESTION" && lobbyState.question && lobbyState.questionStartTime) {
      const interval = setInterval(() => {
        const start = new Date(lobbyState.questionStartTime).getTime();
        const now = new Date().getTime();
        const elapsed = (now - start) / 1000;
        const remaining = Math.max(0, lobbyState.question!.timeLimit - elapsed);
        setTimeLeft(Math.ceil(remaining));

        // Auto transition to leaderboard if time is up and we are still in QUESTION state on client
        if (remaining <= 0) {
          handleAction("SHOW_LEADERBOARD");
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lobbyState?.state, lobbyState?.questionStartTime, lobbyState?.question?.timeLimit]);

  const handleAction = async (action: string) => {
    await fetch(`/api/lobby/${pin}/action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action })
    });
    // Optimistically could update state, but polling will catch it in ~1s anyway
  };

  if (!lobbyState) {
    return <div className="container min-h-screen flex items-center justify-center">Loading Lobby...</div>;
  }

  const { state, players, question, quizTitle, currentQuestionIndex, totalQuestions } = lobbyState;

  if (state === "WAITING") {
    return (
      <div className="container min-h-screen" style={{ paddingTop: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>{quizTitle}</h2>
        <div className="glass-panel" style={{ margin: '2rem auto', maxWidth: '600px', padding: '3rem', background: 'var(--bg-gradient-start)' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem' }}>Join at</p>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary-color)' }}>{window.location.origin}/play</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '2rem', marginBottom: '0.5rem' }}>Game PIN:</p>
          <div style={{ fontSize: '6rem', fontWeight: 900, letterSpacing: '0.5rem', color: 'var(--text-primary)', lineHeight: 1 }}>
            {pin}
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Players ({players.length})</h3>
          {players.length > 0 && (
            <button className="btn-primary" onClick={() => handleAction("START_GAME")} style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}>
              Start Game
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '1000px', margin: '0 auto' }}>
          {players.map((p, idx) => (
            <div key={p.id} className="glass-panel animate-pop-in" style={{ padding: '1rem 2rem', fontSize: '1.5rem', fontWeight: 600, animationDelay: `${(idx % 10) * 100}ms` }}>
              {p.nickname}
            </div>
          ))}
          {players.length === 0 && <p className="text-muted">Waiting for players...</p>}
        </div>
      </div>
    );
  }

  if (state === "QUESTION" && question) {
    const allAnswered = players.length > 0 && players.every(p => p.hasAnsweredCurrent);
    
    // Auto advance if everyone answered
    if (allAnswered) {
      setTimeout(() => {
        handleAction("SHOW_LEADERBOARD");
      }, 1000);
    }

    const optionColors = ["#ef4444", "#3b82f6", "#eab308", "#22c55e"]; // Red, Blue, Yellow, Green

    return (
      <div className="container min-h-screen" style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span className={timeLeft <= 5 ? 'animate-pulse-urgent' : ''} style={{ fontSize: '3rem', fontWeight: 900, color: timeLeft <= 5 ? '#ef4444' : 'var(--text-primary)' }}>
            {timeLeft}
          </span>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Answers: {players.filter(p => p.hasAnsweredCurrent).length} / {players.length}
          </span>
        </div>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', margin: '2rem 0 4rem 0', fontWeight: 800 }}>{question.text}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1, maxHeight: '400px' }}>
          {question.options.map((opt, idx) => (
            <div key={opt.id} className="game-option-card animate-slide-up" style={{ 
              background: optionColors[idx % 4], 
              color: 'white', 
              borderRadius: '0.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              padding: '2rem', 
              fontSize: '2rem', 
              fontWeight: 700,
              boxShadow: '0 8px 0 rgba(0,0,0,0.2)',
              animationDelay: `${idx * 150}ms`
            }}>
              {opt.text}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state === "LEADERBOARD") {
    // When showing leaderboard after a question, the API reveals the correct answer.
    const correctOptions = question?.options.filter(o => o.isCorrect) || [];
    
    return (
      <div className="container min-h-screen" style={{ paddingTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="heading-lg">Scoreboard</h1>
          <button className="btn-primary" onClick={() => handleAction("NEXT_QUESTION")} style={{ fontSize: '1.25rem', padding: '0.75rem 2rem' }}>
            Next
          </button>
        </div>

        {correctOptions.length > 0 && (
          <div className="glass-panel" style={{ marginBottom: '2rem', borderLeft: '4px solid #22c55e', background: 'rgba(34, 197, 94, 0.1)' }}>
            <h3 style={{ margin: 0, color: '#22c55e' }}>Correct Answer: {correctOptions.map(o => o.text).join(" / ")}</h3>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
          {players.slice(0, 5).map((p, idx) => (
            <div key={p.id} className="glass-panel animate-slide-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', animationDelay: `${idx * 150}ms` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: idx === 0 ? '#eab308' : idx === 1 ? '#94a3b8' : idx === 2 ? '#b45309' : 'var(--text-secondary)' }}>
                  #{idx + 1}
                </span>
                <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{p.nickname}</span>
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>{p.score}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state === "FINISHED") {
    return (
      <div className="container min-h-screen flex flex-col items-center justify-center" style={{ paddingTop: '2rem', textAlign: 'center' }}>
        <h1 className="heading-xl" style={{ marginBottom: '4rem' }}>🏆 Final Podium 🏆</h1>
        
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '1rem', height: '300px' }}>
          {players[1] && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="animate-pop-in" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', animationDelay: '1.5s' }}>{players[1].nickname}</span>
              <span className="animate-pop-in" style={{ fontSize: '1.2rem', marginBottom: '1rem', animationDelay: '1.5s' }}>{players[1].score}</span>
              <div className="animate-slide-up podium-bar" style={{ width: '150px', height: '150px', background: '#94a3b8', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '1rem', fontSize: '3rem', fontWeight: 900, color: 'white', animationDelay: '1s' }}>2</div>
            </div>
          )}
          
          {players[0] && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="animate-pop-in" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#eab308', animationDelay: '2s' }}>{players[0].nickname}</span>
              <span className="animate-pop-in" style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700, animationDelay: '2s' }}>{players[0].score}</span>
              <div className="animate-slide-up podium-bar" style={{ width: '170px', height: '220px', background: '#eab308', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '1rem', fontSize: '4rem', fontWeight: 900, color: 'white', animationDelay: '0.5s' }}>1</div>
            </div>
          )}

          {players[2] && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="animate-pop-in" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', animationDelay: '1s' }}>{players[2].nickname}</span>
              <span className="animate-pop-in" style={{ fontSize: '1.2rem', marginBottom: '1rem', animationDelay: '1s' }}>{players[2].score}</span>
              <div className="animate-slide-up podium-bar" style={{ width: '140px', height: '100px', background: '#b45309', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '1rem', fontSize: '2.5rem', fontWeight: 900, color: 'white', animationDelay: '1.2s' }}>3</div>
            </div>
          )}
        </div>
        
        <button className="btn-secondary" onClick={() => router.push("/quizzes")} style={{ marginTop: '4rem', padding: '1rem 3rem', fontSize: '1.25rem' }}>
          Exit
        </button>
      </div>
    );
  }

  return null;
}
