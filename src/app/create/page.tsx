"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { categoriesData } from "../../data/categories";

export default function CreateQuiz() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  const [timeLimit, setTimeLimit] = useState("");



  const [questions, setQuestions] = useState([
    { text: "", imageUrl: "", options: [{ text: "", isCorrect: true }, { text: "", isCorrect: false }] }
  ]);
  const [loading, setLoading] = useState(false);
  const [isTimerEnabled, setIsTimerEnabled] = useState(false);

  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.title) setTitle(data.title);
        if (data.description) setDescription(data.description);
        if (data.category) setCategory(data.category);
        if (data.subcategory) setSubcategory(data.subcategory);
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions.map((q: any) => ({
            text: q.text || "",
            imageUrl: "",
            options: q.options || [{ text: "", isCorrect: true }, { text: "", isCorrect: false }]
          })));
        }
        // Scroll down slightly and notify user, especially helpful on mobile
        alert("Quiz generated successfully! Scroll down to review and submit.");
        window.scrollBy({ top: 400, behavior: "smooth" });
      } else {
        alert("Error: " + (data.error || "Failed to generate"));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to AI service.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "unauthenticated") {
    return null;
  }

  const addQuestion = () => {
    setQuestions([...questions, { text: "", imageUrl: "", options: [{ text: "", isCorrect: true }, { text: "", isCorrect: false }] }]);
  };

  const removeQuestion = (qIndex: number) => {
    setQuestions(questions.filter((_, i) => i !== qIndex));
  };

  const updateQuestion = (qIndex: number, text?: string, imageUrl?: string) => {
    const updated = [...questions];
    if (text !== undefined) updated[qIndex].text = text;
    if (imageUrl !== undefined) updated[qIndex].imageUrl = imageUrl;
    setQuestions(updated);
  };

  const handleImageUpload = (qIndex: number, file: File) => {
    if (!file) return;
    if (file.size > 500 * 1024) { // 500KB limit
      alert("Image is too large. Please upload an image smaller than 500KB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      updateQuestion(qIndex, undefined, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push({ text: "", isCorrect: false });
    setQuestions(updated);
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options = updated[qIndex].options.filter((_, i) => i !== oIndex);
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, oIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex].text = text;
    setQuestions(updated);
  };

  const setCorrectOption = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.forEach((opt, i) => {
      opt.isCorrect = i === oIndex;
    });
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, subcategory, timeLimit: timeLimit ? parseInt(timeLimit) : null, questions }),
      });

      if (res.ok) {
        router.push("/quizzes");
        router.refresh();
      } else {
        alert("Failed to create quiz");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating quiz");
    } finally {
      setLoading(false);
    }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
        setIsSubcategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 className="heading-lg" style={{ margin: 0 }}>Create a New Quiz</h1>
        </div>

        {/* AI Generator Section */}
        <div style={{ 
          background: 'var(--bg-gradient-start)', 
          border: '1px solid var(--primary-color)', 
          borderRadius: '1rem', 
          padding: '1.5rem', 
          marginBottom: '2rem',
          boxShadow: '0 0 20px rgba(79, 70, 229, 0.15)'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🪄</span> Generate with AI
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Describe the quiz you want to create, and our AI will automatically generate the title, description, and questions for you!
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              className="form-input"
              placeholder='e.g., "A 5-question hard quiz about the History of Rome"'
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              style={{ flex: 1, marginBottom: 0 }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  generateWithAI();
                }
              }}
            />
            <button 
              type="button" 
              className="btn-primary" 
              onClick={generateWithAI}
              disabled={aiLoading || !aiPrompt.trim()}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}
            >
              {aiLoading ? (
                <>
                  <div style={{ 
                    width: '16px', height: '16px', 
                    border: '2px solid rgba(255,255,255,0.3)', 
                    borderTopColor: 'white', 
                    borderRadius: '50%', 
                    animation: 'spin 1s linear infinite' 
                  }} />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Quiz Title</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div ref={dropdownRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0, position: 'relative' }}>
              <label className="form-label">Category</label>
              <div 
                className="form-input" 
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <span>{category || "Select Category (Optional)"}</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {isCategoryOpen && (
                <div className="custom-scrollbar dropdown-animate" style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999, background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', marginTop: '4px', padding: '4px', maxHeight: '250px', overflowY: 'auto', boxShadow: 'var(--glass-shadow)' }}>
                  <div 
                    style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', color: 'var(--text-muted)' }}
                    onClick={() => { setCategory(""); setSubcategory(""); setIsCategoryOpen(false); }}
                  >
                    None
                  </div>
                  {Object.keys(categoriesData).map(cat => (
                    <div 
                      key={cat}
                      style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', background: category === cat ? 'rgba(79, 70, 229, 0.1)' : 'transparent', color: category === cat ? 'var(--primary-color)' : 'var(--text-primary)' }}
                      onClick={() => { setCategory(cat); setSubcategory(""); setIsCategoryOpen(false); }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(79, 70, 229, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = category === cat ? 'rgba(79, 70, 229, 0.1)' : 'transparent'}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="form-group" style={{ marginBottom: 0, position: 'relative' }}>
              <label className="form-label">Subcategory</label>
              <div 
                className="form-input" 
                style={{ cursor: category ? 'pointer' : 'not-allowed', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: category ? 1 : 0.5 }}
                onClick={() => category && setIsSubcategoryOpen(!isSubcategoryOpen)}
              >
                <span>{subcategory || "Select Subcategory (Optional)"}</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: isSubcategoryOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {isSubcategoryOpen && category && (
                <div className="custom-scrollbar dropdown-animate" style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999, background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', marginTop: '4px', padding: '4px', maxHeight: '250px', overflowY: 'auto', boxShadow: 'var(--glass-shadow)' }}>
                  <div 
                    style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', color: 'var(--text-muted)' }}
                    onClick={() => { setSubcategory(""); setIsSubcategoryOpen(false); }}
                  >
                    None
                  </div>
                  {categoriesData[category]?.map(sub => (
                    <div 
                      key={sub}
                      style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', background: subcategory === sub ? 'rgba(79, 70, 229, 0.1)' : 'transparent', color: subcategory === sub ? 'var(--primary-color)' : 'var(--text-primary)' }}
                      onClick={() => { setSubcategory(sub); setIsSubcategoryOpen(false); }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(79, 70, 229, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = subcategory === sub ? 'rgba(79, 70, 229, 0.1)' : 'transparent'}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div style={{ marginBottom: '2rem', background: 'rgba(var(--primary-rgb), 0.03)', border: '1px solid rgba(var(--primary-rgb), 0.2)', borderRadius: '1rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Enable Quiz Timer
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Add a global countdown clock for the entire quiz.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newState = !isTimerEnabled;
                  setIsTimerEnabled(newState);
                  if (!newState) {
                    setTimeLimit("");
                  }
                }}
                style={{
                  width: '50px',
                  height: '26px',
                  borderRadius: '13px',
                  background: isTimerEnabled ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  left: isTimerEnabled ? '26px' : '2px',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.3s ease'
                }} />
              </button>
            </div>
            
            {isTimerEnabled && (
              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px dashed rgba(var(--primary-rgb), 0.3)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'stretch' }}>
                  <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 500 }}>Quick Presets</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                      {[
                        { label: '30s', value: "30" },
                        { label: '1m', value: "60" },
                        { label: '5m', value: "300" },
                        { label: '15m', value: "900" },
                        { label: '30m', value: "1800" },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setTimeLimit(preset.value)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '99px',
                            border: `1px solid ${timeLimit === preset.value ? 'var(--primary-color)' : 'var(--glass-border)'}`,
                            background: timeLimit === preset.value ? 'rgba(var(--primary-rgb), 0.1)' : 'var(--glass-bg)',
                            color: timeLimit === preset.value ? 'var(--primary-color)' : 'inherit',
                            cursor: 'pointer',
                            fontWeight: 600,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                    
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--glass-border)' }}>
                      <input
                        type="range"
                        min="0"
                        max="3600"
                        step="15"
                        value={timeLimit || 0}
                        onChange={(e) => setTimeLimit(e.target.value === "0" ? "" : e.target.value)}
                        style={{ flex: 1, cursor: 'pointer', transition: 'all 0.2s ease' }}
                      />
                      <div 
                        key={timeLimit}
                        style={{ 
                          minWidth: '90px', 
                          textAlign: 'right', 
                          fontWeight: 600, 
                          color: 'var(--primary-color)'
                        }}
                      >
                        {timeLimit ? `${Math.floor(parseInt(timeLimit) / 60)}m ${parseInt(timeLimit) % 60}s` : '0s'}
                      </div>
                    </div>
                  </div>

                  <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '1px solid var(--glass-border)', paddingLeft: '2rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 500 }}>
                        Exact Custom Time (seconds)
                      </label>
                      <input
                        type="number"
                        className="form-input"
                        style={{ width: '100%', padding: '0.75rem 1rem' }}
                        value={timeLimit}
                        onChange={(e) => {
                          let val = parseInt(e.target.value);
                          if (val > 3600) val = 3600;
                          setTimeLimit(e.target.value === "" ? "" : (val || 0).toString());
                        }}
                        placeholder="e.g. 120"
                        min="1"
                        max="3600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h3 className="heading-lg" style={{ fontSize: '1.5rem' }}>Questions</h3>
            {questions.map((q, qIndex) => (
              <div key={qIndex} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontWeight: 600 }}>Question {qIndex + 1}</h4>
                  {questions.length > 1 && (
                    <button type="button" onClick={() => removeQuestion(qIndex)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Remove</button>
                  )}
                </div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your question"
                  value={q.text}
                  onChange={(e) => updateQuestion(qIndex, e.target.value)}
                  required
                  style={{ marginBottom: '1rem' }}
                />
                {!q.imageUrl ? (
                  <div style={{ marginBottom: '1rem' }}>
                    <label 
                      style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(59, 130, 246, 0.1)', 
                        color: 'var(--primary-color)',
                        padding: '0.6rem 1rem', 
                        borderRadius: '0.5rem', 
                        border: '1px solid rgba(59, 130, 246, 0.3)', 
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      Add Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(qIndex, e.target.files[0]);
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                ) : (
                  <div style={{ 
                    position: 'relative', 
                    marginBottom: '1.5rem', 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    display: 'inline-block',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    animation: 'slideInLeft 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
                  }}>
                    <img src={q.imageUrl} alt="Question Preview" style={{ maxHeight: '200px', display: 'block', objectFit: 'contain', background: 'rgba(0,0,0,0.2)' }} />
                    <button 
                      type="button" 
                      onClick={() => updateQuestion(qIndex, undefined, "")}
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.9)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      title="Remove Image"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}
                
                <div style={{ marginLeft: '1rem' }}>
                  <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Options (Select the correct one):</p>
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={opt.isCorrect}
                        onChange={() => setCorrectOption(qIndex, oIndex)}
                        required
                        style={{ width: '1.2rem', height: '1.2rem' }}
                      />
                      <input
                        type="text"
                        className="form-input"
                        placeholder={`Option ${oIndex + 1}`}
                        value={opt.text}
                        onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                        required
                        style={{ padding: '0.5rem', flex: 1 }}
                      />
                      {q.options.length > 2 && (
                        <button type="button" onClick={() => removeOption(qIndex, oIndex)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>✕</button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addOption(qIndex)} className="btn-secondary" style={{ marginTop: '0.5rem', padding: '0.3rem 1rem', fontSize: '0.8rem' }}>
                    + Add Option
                  </button>
                </div>
              </div>
            ))}
            
            <button type="button" onClick={addQuestion} className="btn-secondary" style={{ width: '100%', marginBottom: '2rem', borderStyle: 'dashed' }}>
              + Add Question
            </button>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }} disabled={loading}>
            {loading ? "Creating..." : "Publish Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
}
