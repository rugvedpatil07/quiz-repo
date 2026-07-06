import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  // Check for the passkey cookie
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get("admin_auth");

  if (!adminAuth || adminAuth.value !== "true") {
    redirect("/admin");
  }

  // Fetch all users
  let users: any[] = [];
  try {
    users = await prisma.user.findMany();
  } catch (err: any) {
    console.error("Failed to fetch users:", err);
  }

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: '100vh', position: 'relative' }}>
      
      {/* Premium Hey Admin Animation Overlay */}
      <div className="admin-greeting-overlay" style={{
        position: 'fixed',
        inset: 0,
        background: '#050505',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        animation: 'fadeOutOverlay 1s ease 2s forwards'
      }}>
        <h1 style={{
          fontSize: '4rem',
          color: '#D4AF37',
          letterSpacing: '5px',
          textTransform: 'uppercase',
          fontWeight: 800,
          opacity: 0,
          animation: 'slideUpText 1s ease 0.5s forwards'
        }}>
          Hey Admin
        </h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="heading-xl" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#D4AF37' }}>Admin Dashboard</h1>
          <p className="text-muted">Welcome back. Here is the registered user data.</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #AA8C2C 100%)', color: '#000', padding: '0.5rem 1.5rem', borderRadius: '20px', fontWeight: 'bold', letterSpacing: '1px' }}>
          PREMIUM PORTAL
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUpText {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeOutOverlay {
          0% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }
      `}} />

      <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>Registered Users</h2>

        {users && users.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            No users have registered yet.
          </div>
        )}

        {users && users.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>ID</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Name</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Email</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id || idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{user.id?.substring(0, 8)}...</td>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{user.name || 'Unnamed User'}</td>
                    <td style={{ padding: '1rem' }}><a href={`mailto:${user.email}`} style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>{user.email}</a></td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        background: user.emailVerified ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)', 
                        color: user.emailVerified ? '#22c55e' : '#eab308', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}>
                        {user.emailVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
