"use client";

export function HeroBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        background: "linear-gradient(140deg, #fffaf0 0%, #fff0f5 30%, #f0f8ff 70%, #f8f4ff 100%)",
      }}
    >
      <div 
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "50%",
          height: "50%",
          background: "radial-gradient(circle, rgba(255,228,196,0.6) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(80px)",
        }}
      />
      <div 
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "20%",
          width: "60%",
          height: "60%",
          background: "radial-gradient(circle, rgba(204,235,255,0.6) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(100px)",
        }}
      />
      <div 
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "50%",
          height: "60%",
          background: "radial-gradient(circle, rgba(255,192,203,0.5) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(90px)",
        }}
      />
      <div 
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "40%",
          height: "40%",
          background: "radial-gradient(circle, rgba(230,230,250,0.6) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
