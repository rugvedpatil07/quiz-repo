"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { calculateLevel, getRankTitle, getRankColor } from "@/lib/gamification";

interface LeaderboardEntry {
  id: number;
  name: string;
  image: string | null;
  totalXP: number;
}

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setLeaders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container min-h-screen animate-fade-in-up" style={{ paddingTop: '3rem', paddingBottom: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="heading-xl">Global Rankings</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Discover the top QuizMasters on our platform. Earn XP by completing quizzes and climb the ranks!
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
             <div style={{ 
               display: 'inline-block', 
               width: '40px', 
               height: '40px', 
               border: '3px solid var(--glass-border)', 
               borderTopColor: 'var(--primary-color)', 
               borderRadius: '50%', 
               animation: 'spin 1s linear infinite' 
             }} />
             <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
             <p className="text-muted" style={{ marginTop: '1rem' }}>Loading champions...</p>
          </div>
        ) : leaders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p className="text-muted">No scores yet. Be the first to take a quiz!</p>
            <Link href="/quizzes" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
              Take a Quiz
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {leaders.map((user, index) => {
              const level = calculateLevel(user.totalXP);
              const rankTitle = getRankTitle(level);
              const rankColor = getRankColor(level);

              return (
              <div 
                key={user.id} 
                className="quiz-card"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '1.25rem 1.5rem', 
                  background: index < 3 ? 'var(--bg-gradient-start)' : 'var(--input-bg)',
                  border: index < 3 ? `1px solid ${rankColor}55` : '1px solid var(--input-border)',
                  borderRadius: 'var(--radius-lg)',
                  justifyContent: 'space-between',
                  boxShadow: index === 0 ? `0 0 20px ${rankColor}44` : 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {index === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, height: '4px',
                    background: `linear-gradient(90deg, transparent, ${rankColor}, transparent)`
                  }} />
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ 
                    fontSize: index < 3 ? '2rem' : '1.5rem', 
                    fontWeight: 'bold', 
                    color: index === 0 ? '#fbbf24' : index === 1 ? '#94a3b8' : index === 2 ? '#b45309' : 'var(--text-secondary)',
                    width: '50px',
                    textAlign: 'center',
                    textShadow: index < 3 ? `0 0 10px currentColor` : 'none'
                  }}>
                    #{index + 1}
                  </div>
                  <div 
                    style={{ 
                      width: index < 3 ? '55px' : '45px', 
                      height: index < 3 ? '55px' : '45px', 
                      borderRadius: '50%', 
                      background: 'var(--input-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      textTransform: 'uppercase',
                      overflow: 'hidden',
                      border: `2px solid ${rankColor}`
                    }}
                  >
                    {user.image ? (
                      <img src={user.image} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      user.name[0]
                    )}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {user.name}
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '20px',
                        background: `${rankColor}22`,
                        color: rankColor,
                        border: `1px solid ${rankColor}55`,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 700
                      }}>
                        Lvl {level}
                      </span>
                    </h3>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                      {rankTitle}
                    </div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                    {user.totalXP.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                    Total XP
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}

