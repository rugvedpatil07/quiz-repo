"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { calculateLevel, getRankTitle, getRankColor, getXPProgress } from "@/lib/gamification";
import { PremiumBackground } from "@/components/PremiumBackground";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '@/lib/cropImage';

export default function Profile() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Cropper state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.totalXP !== undefined) setTotalXP(data.totalXP);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setBio((session.user as any).bio || "");
      setImage((session.user as any).image || "");
    }
  }, [session]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "unauthenticated") {
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageToCrop(url);
      setIsCropping(true);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCrop = async () => {
    if (!imageToCrop || !croppedAreaPixels) return;
    try {
      const croppedFile = await getCroppedImg(imageToCrop, croppedAreaPixels);
      setImageFile(croppedFile);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(URL.createObjectURL(croppedFile));
      setIsCropping(false);
    } catch (e) {
      console.error(e);
      setMessage("Failed to crop image.");
    }
  };

  const handleCancelCrop = () => {
    setIsCropping(false);
    if (imageToCrop) URL.revokeObjectURL(imageToCrop);
    setImageToCrop(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (image) {
        formData.append("image", image);
      }

      const res = await fetch("/api/profile", {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setMessage("Profile updated successfully!");
        
        await update({ 
          name, 
          bio, 
          image: data.image || image 
        });
        
        setImageFile(null);
        if (data.image) {
          setImage(data.image);
        }
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  const displayImage = imagePreview || image;
  const level = calculateLevel(totalXP);
  const rankColor = getRankColor(level);
  const progress = getXPProgress(totalXP);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Background Layer */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <PremiumBackground />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: "6rem 1.5rem" }}>
        
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Your Identity</h1>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8' }}>Customize your profile and track your global progression.</p>
        </div>

        {message && (
          <div className="animate-pop-in" style={{
            maxWidth: "800px", margin: "0 auto 2rem auto", padding: "1rem", borderRadius: "12px",
            background: message.includes("success") ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
            border: `1px solid ${message.includes("success") ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
            color: message.includes("success") ? "#34d399" : "#fca5a5",
            textAlign: "center", backdropFilter: "blur(10px)"
          }}>
            {message}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Card A: Identity & Gamification (Left Side) */}
          <div className="animate-fade-in-up" style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '150px', background: `linear-gradient(180deg, ${rankColor}33 0%, transparent 100%)`, zIndex: 0 }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, marginBottom: '2rem' }}>
              <div
                onClick={triggerFileInput}
                title="Click to change profile picture"
                style={{
                  width: "140px", height: "140px", borderRadius: "50%", background: "rgba(15, 23, 42, 0.8)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "3rem", textTransform: "uppercase", overflow: "hidden", cursor: "pointer",
                  border: `4px solid ${rankColor}`, boxShadow: `0 0 30px ${rankColor}66, inset 0 0 20px rgba(0,0,0,0.5)`,
                  transition: "all 0.3s ease",
                }}
              >
                {displayImage ? (
                  <img src={displayImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  name?.[0] || "U"
                )}
              </div>
              <div style={{
                position: "absolute", bottom: "-15px", left: "50%", transform: "translateX(-50%)",
                background: `linear-gradient(135deg, ${rankColor}, #0f172a)`, color: "white", padding: "0.3rem 1rem", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "bold",
                border: `1px solid rgba(255,255,255,0.4)`, boxShadow: `0 4px 15px rgba(0,0,0,0.5)`, whiteSpace: "nowrap"
              }}>
                Lvl {level}
              </div>
            </div>
            
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff", marginBottom: "0.25rem", zIndex: 1 }}>{name || "User"}</h2>
            <p style={{ color: rankColor, fontWeight: 700, fontSize: "1rem", marginBottom: "2.5rem", zIndex: 1, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {getRankTitle(level)}
            </p>

            <div style={{ width: "100%", zIndex: 1, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#94a3b8", marginBottom: "0.75rem", fontWeight: 600 }}>
                <span>{totalXP.toLocaleString()} XP</span>
                <span>{progress.nextLevelXP.toLocaleString()} XP</span>
              </div>
              <div style={{ width: "100%", height: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "6px", overflow: "hidden", border: '1px solid rgba(0,0,0,0.5)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}>
                <div style={{ 
                  width: `${progress.percentage}%`, height: "100%", 
                  background: `linear-gradient(90deg, ${rankColor}, #fff)`,
                  borderRadius: "6px", transition: "width 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
                  boxShadow: `0 0 10px ${rankColor}`
                }} />
              </div>
              <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#64748b", marginTop: "1rem", fontWeight: 500 }}>
                {progress.percentage}% to Level {level + 1}
              </p>
            </div>

            <Link 
              href="/dashboard"
              style={{
                marginTop: "2.5rem", width: '100%', display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", padding: "1rem",
                background: "linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)", color: "#fff", borderRadius: "12px", fontWeight: 600, textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s ease", zIndex: 1, boxShadow: '0 10px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              View Analytics Dashboard
            </Link>
            
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
          </div>

          {/* Card B: Profile Settings (Right Side) */}
          <div className="animate-fade-in-up delay-200" style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '3rem 2rem', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Account Settings</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                <input
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  style={{ width: '100%', padding: '1rem 1.25rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', color: '#64748b', fontSize: '1rem', outline: 'none', cursor: 'not-allowed' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'all 0.2s ease', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}
                  onFocus={(e) => e.target.style.border = `1px solid ${rankColor}`}
                  onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bio</label>
                <textarea
                  rows={5}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us a bit about yourself..."
                  style={{ width: '100%', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'all 0.2s ease', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)', resize: 'none' }}
                  onFocus={(e) => e.target.style.border = `1px solid ${rankColor}`}
                  onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 'auto', width: "100%", fontSize: "1.1rem", fontWeight: 700, padding: "1rem", borderRadius: "12px",
                  background: loading ? "rgba(255,255,255,0.1)" : "linear-gradient(180deg, #ffffff 0%, #d4d4d8 100%)",
                  color: loading ? "#94a3b8" : "#09090b", border: "none", cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading ? "none" : "inset 0 1px 0 #ffffff, 0 10px 30px rgba(255,255,255,0.1)",
                  transition: "all 0.2s ease"
                }}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
          
        </div>
      </div>

      {/* Cropper Modal */}
      {isCropping && imageToCrop && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            width: '90%', maxWidth: '500px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', textAlign: 'center' }}>Crop Profile Image</h3>
            
            <div style={{ position: 'relative', width: '100%', height: '300px', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            
            <div style={{ padding: '0 1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem', textAlign: 'center' }}>Zoom</label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                style={{ width: '100%', accentColor: rankColor }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={handleCancelCrop}
                style={{
                  flex: 1, padding: '0.75rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCrop}
                style={{
                  flex: 1, padding: '0.75rem', borderRadius: '12px', background: rankColor, color: '#fff',
                  border: 'none', fontWeight: 600, cursor: 'pointer', boxShadow: `0 4px 15px ${rankColor}66`, transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}
              >
                Save Crop
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
