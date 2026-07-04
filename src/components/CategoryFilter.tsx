"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { categoriesData } from "../data/categories";

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialCategory = searchParams.get("category") || "";
  const initialSubcategory = searchParams.get("subcategory") || "";

  const [category, setCategory] = useState(initialCategory);
  const [subcategory, setSubcategory] = useState(initialSubcategory);
  
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  
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

  const updateFilters = (newCategory: string, newSubcategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }

    if (newSubcategory) {
      params.set("subcategory", newSubcategory);
    } else {
      params.delete("subcategory");
    }

    router.push(`/quizzes?${params.toString()}`);
  };

  return (
    <div ref={dropdownRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem', maxWidth: '600px' }}>
      <div className="form-group" style={{ marginBottom: 0, position: 'relative' }}>
        <div 
          className="form-input" 
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <span>{category || "Filter by Category"}</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        {isCategoryOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999, background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', marginTop: '4px', padding: '4px', maxHeight: '250px', overflowY: 'auto', boxShadow: 'var(--glass-shadow)', animation: 'slideDown 0.2s ease forwards' }}>
            <div 
              style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', color: 'var(--text-muted)' }}
              onClick={() => { 
                setCategory(""); 
                setSubcategory(""); 
                setIsCategoryOpen(false); 
                updateFilters("", "");
              }}
            >
              All Categories
            </div>
            {Object.keys(categoriesData).map(cat => (
              <div 
                key={cat}
                style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', background: category === cat ? 'rgba(79, 70, 229, 0.1)' : 'transparent', color: category === cat ? 'var(--primary-color)' : 'var(--text-primary)' }}
                onClick={() => { 
                  setCategory(cat); 
                  setSubcategory(""); 
                  setIsCategoryOpen(false); 
                  updateFilters(cat, "");
                }}
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
        <div 
          className="form-input" 
          style={{ cursor: category ? 'pointer' : 'not-allowed', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: category ? 1 : 0.5 }}
          onClick={() => category && setIsSubcategoryOpen(!isSubcategoryOpen)}
        >
          <span>{subcategory || "Filter by Subcategory"}</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: isSubcategoryOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        {isSubcategoryOpen && category && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999, background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', marginTop: '4px', padding: '4px', maxHeight: '250px', overflowY: 'auto', boxShadow: 'var(--glass-shadow)', animation: 'slideDown 0.2s ease forwards' }}>
            <div 
              style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', color: 'var(--text-muted)' }}
              onClick={() => { 
                setSubcategory(""); 
                setIsSubcategoryOpen(false); 
                updateFilters(category, "");
              }}
            >
              All Subcategories
            </div>
            {categoriesData[category]?.map(sub => (
              <div 
                key={sub}
                style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', background: subcategory === sub ? 'rgba(79, 70, 229, 0.1)' : 'transparent', color: subcategory === sub ? 'var(--primary-color)' : 'var(--text-primary)' }}
                onClick={() => { 
                  setSubcategory(sub); 
                  setIsSubcategoryOpen(false); 
                  updateFilters(category, sub);
                }}
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
  );
}
