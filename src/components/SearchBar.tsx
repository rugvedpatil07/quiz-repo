"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function SearchBar() {
  const router = useRouter();
  
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchContainerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`/api/quizzes?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.slice(0, 5));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsFocused(false);
      router.push(`/quizzes?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <div 
        className="spotlight-overlay"
        style={{
          opacity: isFocused ? 1 : 0,
          pointerEvents: isFocused ? 'auto' : 'none',
        }}
        onClick={() => setIsFocused(false)}
      />

      <div className="search-section-wrapper" style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: isFocused ? 100 : 1, transition: 'transform 0.3s ease', transform: isFocused ? 'scale(1.02)' : 'scale(1)' }}>
        <form 
          ref={searchContainerRef}
          onSubmit={handleSearchSubmit}
          className="global-search-container"
          style={{ width: '100%', maxWidth: '700px' }}
        >
          <input 
            ref={inputRef}
            type="text" 
            name="q" 
            placeholder="Search quizzes by title, category, or topic..." 
            className="global-search-input" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            autoComplete="off"
            required 
            style={{ 
              paddingRight: '6rem', 
              height: '3.8rem', 
              fontSize: '1.15rem',
              background: isFocused ? 'var(--input-bg)' : 'var(--glass-bg)',
              borderColor: isFocused ? 'var(--primary-color)' : 'var(--glass-border)',
              boxShadow: isFocused ? '0 0 0 4px rgba(79, 70, 229, 0.2), 0 20px 40px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.2)'
            }}
          />
          <button type="submit" className="global-search-button" aria-label="Search" style={{ left: '1.2rem', top: '50%', transform: 'translateY(-50%)', height: 'auto', pointerEvents: 'none', color: isFocused ? 'var(--primary-color)' : 'var(--text-secondary)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Keyboard Shortcut Hint / ESC to close */}
          <div style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '0.4rem', pointerEvents: 'none' }}>
            {isFocused ? (
              <kbd style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.75rem', fontWeight: 600, color: '#fca5a5' }}>ESC</kbd>
            ) : (
              <>
                <kbd style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '6px', padding: '0.3rem 0.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', boxShadow: '0 2px 0 rgba(0,0,0,0.2)' }}>⌘</kbd>
                <kbd style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '6px', padding: '0.3rem 0.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', boxShadow: '0 2px 0 rgba(0,0,0,0.2)' }}>K</kbd>
              </>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isFocused && query.trim() !== "" && (
            <div className="search-suggestions-dropdown animate-fade-in-up" style={{ top: 'calc(100% + 0.75rem)', borderRadius: '16px', border: '1px solid rgba(139, 92, 246, 0.3)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', overflow: 'hidden', padding: '0.5rem', background: 'var(--bg-gradient-start)' }}>
              <div style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--glass-border)', marginBottom: '0.5rem' }}>
                Top Results
              </div>
              {isLoading ? (
                <div className="suggestion-item text-muted" style={{ padding: "2rem", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ display: 'inline-block', width: '20px', height: '20px', border: '2.5px solid var(--primary-color)', borderBottomColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                  Searching our database...
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((quiz) => (
                  <div 
                    key={quiz.id} 
                    className="suggestion-item"
                    style={{ borderRadius: '10px', margin: '0.25rem 0', transition: 'all 0.2s ease', padding: '0.85rem 1rem', cursor: 'pointer' }}
                    onClick={() => {
                      setIsFocused(false);
                      router.push(`/take/${quiz.id}`);
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', overflow: 'hidden' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.2), rgba(192, 132, 252, 0.2))', border: '1px solid rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="suggestion-title" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{quiz.title}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{quiz._count?.questions || 0} Questions</div>
                      </div>
                      <div className="suggestion-category" style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.03em' }}>{quiz.category || "General"}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="suggestion-item text-muted" style={{ padding: "2rem", textAlign: "center" }}>
                  No quizzes found for "<span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{query}</span>"
                </div>
              )}
            </div>
          )}
        </form>
        
        {/* Quick Tags Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', opacity: isFocused ? 0 : 1, transition: 'opacity 0.3s ease', pointerEvents: isFocused ? 'none' : 'auto' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Trending:</span>
          {['React', 'Next.js', 'Python', 'General Knowledge', 'AWS'].map((tag) => (
            <span 
              key={tag}
              onClick={() => {
                setQuery(tag);
                router.push(`/quizzes?q=${encodeURIComponent(tag)}`);
              }}
              style={{ 
                fontSize: '0.85rem', 
                fontWeight: 500, 
                padding: '0.35rem 1rem', 
                borderRadius: '9999px', 
                background: 'var(--glass-bg)', 
                border: '1px solid var(--glass-border)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                color: 'var(--text-primary)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)'; e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
