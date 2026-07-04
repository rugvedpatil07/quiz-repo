"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HostLiveButton({ quizId }: { quizId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleHost = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/lobby/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId })
      });
      const data = await res.json();
      if (data.lobby?.pin) {
        router.push(`/host/${data.lobby.pin}`);
      } else {
        alert(data.error || "Failed to create lobby");
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      alert("Error creating live game");
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleHost}
      disabled={loading}
      className="btn-secondary" 
      style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.8rem' }}
    >
      {loading ? "Creating..." : "Host Live"}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
    </button>
  );
}
