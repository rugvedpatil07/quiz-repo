"use client";

import { useState, useEffect } from "react";

export default function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState<"analytics" | "users" | "quizzes">("analytics");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await fetch("/api/admin/data");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId: number) => {
    if (!confirm("Are you sure you want to permanently delete this quiz?")) return;
    
    try {
      const res = await fetch(`/api/admin/quizzes/${quizId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        // Refresh data
        fetchAdminData();
      } else {
        alert("Failed to delete quiz.");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting quiz.");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '3px solid var(--glass-border)', borderTopColor: '#D4AF37', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!data) return <div style={{ color: 'red' }}>Error loading dashboard data.</div>;

  return (
    <div>
      {/* TABS */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab("analytics")}
          style={{ padding: '0.8rem 1.5rem', background: activeTab === 'analytics' ? 'rgba(212, 175, 55, 0.2)' : 'transparent', color: activeTab === 'analytics' ? '#D4AF37' : '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '1.1rem', transition: 'all 0.2s' }}
        >
          📊 Analytics
        </button>
        <button 
          onClick={() => setActiveTab("users")}
          style={{ padding: '0.8rem 1.5rem', background: activeTab === 'users' ? 'rgba(212, 175, 55, 0.2)' : 'transparent', color: activeTab === 'users' ? '#D4AF37' : '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '1.1rem', transition: 'all 0.2s' }}
        >
          👥 Users
        </button>
        <button 
          onClick={() => setActiveTab("quizzes")}
          style={{ padding: '0.8rem 1.5rem', background: activeTab === 'quizzes' ? 'rgba(212, 175, 55, 0.2)' : 'transparent', color: activeTab === 'quizzes' ? '#D4AF37' : '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '1.1rem', transition: 'all 0.2s' }}
        >
          📚 Quizzes
        </button>
      </div>

      {/* CONTENT */}
      <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(212, 175, 55, 0.2)', background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)' }}>
        
        {activeTab === "analytics" && (
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: '#fff', fontWeight: 700 }}>Platform Analytics</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Total Users</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>{data.analytics.totalUsers}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Total Quizzes</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>{data.analytics.totalQuizzes}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Total Attempts</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>{data.analytics.totalAttempts}</div>
              </div>
              <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <div style={{ color: '#D4AF37', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Global XP Farmed</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>{data.analytics.globalTotalXP.toLocaleString()}</div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#fff' }}>Category Popularity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
              {data.analytics.categoryPopularity.map((cat: any) => {
                const max = data.analytics.categoryPopularity[0]?.count || 1;
                const percentage = Math.round((cat.count / max) * 100);
                return (
                  <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '120px', fontSize: '0.9rem', fontWeight: 600, color: '#e2e8f0' }}>{cat.name}</div>
                    <div style={{ flex: 1, height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', background: '#D4AF37', borderRadius: '6px' }} />
                    </div>
                    <div style={{ width: '50px', textAlign: 'right', fontSize: '0.85rem', color: '#94a3b8' }}>{cat.count}</div>
                  </div>
                );
              })}
              {data.analytics.categoryPopularity.length === 0 && <div className="text-muted">No category data yet.</div>}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: '#fff', fontWeight: 700 }}>User Management</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 600 }}>Rank</th>
                    <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 600 }}>User</th>
                    <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 600 }}>Total XP</th>
                    <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 600 }}>Quizzes Authored</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user: any, idx: number) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', color: '#D4AF37', fontWeight: 700 }}>#{idx + 1}</td>
                      <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #818cf8, #c084fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>
                          {(user.name?.[0] || 'U').toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#f8fafc' }}>{user.name || "Unknown"}</div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{user.email}</div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: '#fff', fontWeight: 600 }}>{user.totalXP.toLocaleString()} XP</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>{user.quizzesCreated}</td>
                    </tr>
                  ))}
                  {data.users.length === 0 && (
                    <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No users found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "quizzes" && (
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: '#fff', fontWeight: 700 }}>Content Moderation</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 600 }}>Quiz Title</th>
                    <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 600 }}>Category</th>
                    <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 600 }}>Creator</th>
                    <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 600 }}>Plays</th>
                    <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.quizzes.map((quiz: any) => (
                    <tr key={quiz.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', color: '#f8fafc', fontWeight: 500 }}>
                        {quiz.title}
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>{quiz.questionsCount} Questions</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', color: '#e2e8f0' }}>
                          {quiz.category || "None"}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: '#cbd5e1' }}>{quiz.creatorName}</td>
                      <td style={{ padding: '1rem', color: '#D4AF37', fontWeight: 600 }}>{quiz.playCount}</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleDeleteQuiz(quiz.id)}
                          style={{ padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }}
                          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {data.quizzes.length === 0 && (
                    <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No quizzes found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
