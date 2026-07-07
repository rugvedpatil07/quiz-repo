import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboard() {
  // Check for the passkey cookie
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get("admin_auth");

  if (!adminAuth || adminAuth.value !== "true") {
    redirect("/admin");
  }

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: '100vh', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="heading-xl" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#D4AF37' }}>Admin Dashboard</h1>
          <p className="text-muted">Welcome to the Premium Control Portal. Manage your platform here.</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #AA8C2C 100%)', color: '#000', padding: '0.5rem 1.5rem', borderRadius: '20px', fontWeight: 'bold', letterSpacing: '1px' }}>
          PREMIUM PORTAL
        </div>
      </div>

      <AdminDashboardClient />
    </div>
  );
}
