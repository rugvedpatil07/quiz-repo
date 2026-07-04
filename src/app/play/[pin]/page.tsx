"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PremiumBackground } from "@/components/PremiumBackground";

export default function PlayerController() {
  const params = useParams();
  const router = useRouter();
  const pin = params.pin as string;
  
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [lobbyState, setLobbyState] = useState<any>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const id = localStorage.getItem("lobbyPlayerId");
    if (!id) {
      router.push("/play");
    } else {
      setPlayerId(id);
    }
  }, [router]);

  useEffect(() => {
    if (!playerId) return;

    const fetchState = async () => {
      try {
        const res = await fetch(`/api/lobby/${pin}/state`);
        const data = await res.json();
        
        if (data.error) {
          console.error(data.error);
        } else {
          setLobbyState(data);
          // If the server says we answered (e.g. from a refresh), keep it blocked
          const me = data.players.find((p: any) => p.id === parseInt(playerId));
          if (me) {
            setHasAnswered(me.hasAnsweredCurrent);
            if (data.state !== "QUESTION") {
              setResultMsg("");
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchState();
    const interval = setInterval(fetchState, 1500); // 1.5s poll
    return () => clearInterval(interval);
  }, [pin, playerId]);

  const submitAnswer = async (optionId: number) => {
    if (hasAnswered || !lobbyState?.questionStartTime) return;
    
    setHasAnswered(true);
    
    const start = new Date(lobbyState.questionStartTime).getTime();
    const now = new Date().getTime();
    const elapsed = (now - start) / 1000;

    try {
      const res = await fetch(`/api/lobby/${pin}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SUBMIT_ANSWER",
          playerId,
          optionId,
          timeElapsed: elapsed
        })
      });
      const data = await res.json();
      if (data.success) {
        setPoints(data.pointsAwarded);
        setResultMsg(data.isCorrect ? "✅ Correct!" : "❌ Incorrect");
      }
    } catch (e) {
      console.error(e);
      setHasAnswered(false);
    }
  };

  if (!lobbyState || !playerId) {
    return <><PremiumBackground /><div className="container min-h-screen flex items-center justify-center relative z-10">Connecting...</div></>;
  }

  const { state, question, players } = lobbyState;
  const me = players.find((p: any) => p.id === parseInt(playerId));

  if (state === "WAITING") {
    return (
      <>
        <PremiumBackground />
        <div className="container min-h-screen flex items-center justify-center text-center relative z-10">
          <div className="animate-pop-in">
            <h1 className="heading-lg mb-4">You're in!</h1>
            <p className="text-xl text-muted">See your nickname on screen</p>
            <div className="mt-8 text-3xl font-bold text-[var(--primary-color)]">{me?.nickname}</div>
          </div>
        </div>
      </>
    );
  }

  if (state === "QUESTION") {
    if (hasAnswered) {
      return (
        <>
          <PremiumBackground />
          <div className="container min-h-screen flex items-center justify-center text-center relative z-10">
            <div>
              <h1 className="heading-lg mb-4">Waiting for others...</h1>
              {resultMsg && <div className="text-2xl mt-8 font-bold">{resultMsg}</div>}
              {points > 0 && <div className="text-xl mt-2 text-[var(--primary-color)]">+{points} points</div>}
            </div>
          </div>
        </>
      );
    }

    const optionColors = ["#ef4444", "#3b82f6", "#eab308", "#22c55e"]; // Red, Blue, Yellow, Green

    return (
      <>
        <PremiumBackground />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', height: '100vh', width: '100vw', padding: '0.5rem', gap: '0.5rem', background: 'transparent', position: 'relative', zIndex: 10 }}>
          {question?.options.map((opt: any, idx: number) => (
            <button 
              key={opt.id}
              onClick={() => submitAnswer(opt.id)}
              style={{ 
                background: optionColors[idx % 4], 
                border: 'none', 
                borderRadius: '0.5rem', 
                boxShadow: '0 8px 0 rgba(0,0,0,0.3)',
                animationDelay: `${idx * 100}ms`
              }}
              className="game-option-card animate-pop-in active:translate-y-2 active:shadow-none transition-all cursor-pointer"
            />
          ))}
        </div>
      </>
    );
  }

  if (state === "LEADERBOARD") {
    const rank = players.findIndex((p: any) => p.id === parseInt(playerId)) + 1;
    return (
      <>
        <PremiumBackground />
        <div className="container min-h-screen flex items-center justify-center text-center relative z-10">
          <div className="animate-slide-up">
            <h1 className="heading-lg mb-4">Scoreboard</h1>
            <div className="glass-panel p-8">
              <h2 className="text-2xl mb-4">You are in</h2>
              <div className="text-6xl font-black text-[var(--primary-color)] mb-4">{rank}{rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}</div>
              <div className="text-xl">Score: {me?.score}</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (state === "FINISHED") {
    const rank = players.findIndex((p: any) => p.id === parseInt(playerId)) + 1;
    return (
      <>
        <MatrixRain />
        <div className="container min-h-screen flex flex-col items-center justify-center text-center relative z-10">
          <h1 className="heading-xl mb-8 animate-pop-in">Game Over!</h1>
          <div className="glass-panel p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl mb-4">Final Rank</h2>
            <div className="text-6xl font-black text-[var(--primary-color)] mb-4">{rank}{rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}</div>
            <div className="text-xl">Score: {me?.score}</div>
          </div>
          <button className="btn-primary animate-slide-up" style={{ animationDelay: '1s' }} onClick={() => router.push("/")}>Return to Home</button>
        </div>
      </>
    );
  }

  return null;
}
