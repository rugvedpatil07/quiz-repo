"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { calculateLevel, getRankTitle, getRankColor, getXPProgress } from "@/lib/gamification";

interface TimelineData {
  date: string;
  xp: number;
}

interface CategoryData {
  name: string;
  percentage: number;
  totalQuizzes: number;
}

interface RecentAttempt {
  id: number;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  xpEarned: number;
  date: string;
  isRetake?: boolean;
}

interface AnalyticsData {
  timeline: TimelineData[];
  categories: CategoryData[];
  strongestCategory: CategoryData | null;
  weakestCategory: CategoryData | null;
  totalAttempts: number;
  totalXP: number;
  recentAttempts: RecentAttempt[];
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/analytics")
        .then(res => res.json())
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="container min-h-screen" style={{ paddingTop: '3rem', paddingBottom: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-block', 
            width: '50px', 
            height: '50px', 
            border: '4px solid var(--glass-border)', 
            borderTopColor: 'var(--primary-color)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite' 
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p className="text-muted" style={{ marginTop: '1.5rem', fontWeight: 600 }}>Analyzing your progress...</p>
        </div>
      </div>
    );
  }

  if (!data || data.totalAttempts === 0) {
    return (
      <>

      <div className="container min-h-screen animate-fade-in-up" style={{ paddingTop: '4rem', paddingBottom: '4rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h1 className="heading-xl">Your Analytics Dashboard</h1>
        <div className="glass-panel" style={{ padding: '4rem 2rem', marginTop: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>No data available yet!</h2>
          <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Take some quizzes to generate your personalized learning analytics, track your XP over time, and discover your strongest subjects.
          </p>
          <Link href="/quizzes" className="btn-primary" style={{ display: 'inline-block', padding: '0.75rem 2rem' }}>
            Take a Quiz
          </Link>
        </div>
      </div>
      </>
    );
  }

  // Format dates for the X-Axis
  const formattedTimeline = data.timeline.map(item => {
    const d = new Date(item.date);
    return {
      ...item,
      displayDate: `${d.getMonth() + 1}/${d.getDate()}`
    };
  });

  const level = calculateLevel(data.totalXP);
  const rankColor = getRankColor(level);
  const xpProgress = getXPProgress(data.totalXP);

  return (
    <>


      <div className="container min-h-screen animate-fade-in-up" style={{ paddingTop: '3rem', paddingBottom: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="heading-xl" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '12px' }}>
              <img src="/dashboard_logo.png" alt="Analytics Dashboard Logo" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
            </span>
            Analytics Dashboard
          </h1>
          <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
            Welcome back, {session?.user?.name?.split(' ')[0]}! Here's your learning progress.
          </p>
        </div>

        {/* Mini Gamification Profile Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--glass-bg)', padding: '0.75rem 1.25rem', borderRadius: '1rem', border: `1px solid ${rankColor}55`, boxShadow: `0 4px 20px ${rankColor}22` }}>
          <div style={{ 
            width: '45px', height: '45px', borderRadius: '50%', background: 'var(--input-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase',
            overflow: 'hidden', border: `2px solid ${rankColor}`
          }}>
            {(session?.user as any)?.image ? (
              <img src={(session?.user as any).image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              session?.user?.name?.[0] || 'U'
            )}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Level {level}</span>
              <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '20px', background: `${rankColor}22`, color: rankColor, fontWeight: 700, textTransform: 'uppercase' }}>
                {getRankTitle(level)}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.3rem' }}>
              <div style={{ width: '100px', height: '6px', background: 'var(--input-bg)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${xpProgress.percentage}%`, height: '100%', background: rankColor }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{data.totalXP.toLocaleString()} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Strongest Category Card */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#10b981' }} />
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⭐</span> Strongest Category
          </h3>
          {data.strongestCategory ? (
            <>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {data.strongestCategory.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{ color: '#10b981', fontWeight: 700, fontSize: '1.25rem' }}>{data.strongestCategory.percentage}%</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>accuracy across {data.strongestCategory.totalQuizzes} quizzes</span>
              </div>
            </>
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>Not enough data</div>
          )}
        </div>

        {/* Weakest Category Card */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#ef4444' }} />
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🎯</span> Needs Improvement
          </h3>
          {data.weakestCategory && data.weakestCategory.name !== data.strongestCategory?.name ? (
            <>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {data.weakestCategory.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.25rem' }}>{data.weakestCategory.percentage}%</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>accuracy across {data.weakestCategory.totalQuizzes} quizzes</span>
              </div>
            </>
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>Keep playing to find your weak spots!</div>
          )}
        </div>

        {/* Total Activity */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: 'var(--bg-gradient-start)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--primary-color)' }} />
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🔥</span> Total Quizzes Taken
          </h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-color)', lineHeight: 1 }}>
            {data.totalAttempts}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Main Chart */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </span> 
            Total XP Progress (Last 30 Days)
          </h3>
          <div style={{ width: '100%', height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedTimeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--input-border)" vertical={false} />
                <XAxis 
                  dataKey="displayDate" 
                  stroke="var(--text-muted)" 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="var(--text-muted)" 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--glass-bg)', 
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--glass-shadow)',
                    color: 'var(--text-primary)'
                  }}
                  itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="xp" 
                  name="Total XP"
                  stroke="#818cf8" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorXp)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🕒</span> Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {data.recentAttempts.map((attempt) => (
              <div key={attempt.id} style={{ 
                padding: '1rem', 
                background: 'var(--input-bg)', 
                border: '1px solid var(--input-border)', 
                borderRadius: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <h4 style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0, color: 'var(--text-primary)', lineHeight: 1.3, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {attempt.quizTitle}
                    {attempt.isRetake && (
                      <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Retake
                      </span>
                    )}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {new Date(attempt.date).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Score: {attempt.score}/{attempt.totalQuestions}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: attempt.isRetake ? 'var(--text-muted)' : 'var(--primary-color)' }}>
                    +{attempt.xpEarned} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/quizzes" className="btn-secondary" style={{ width: '100%', marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
            Play More Quizzes
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
