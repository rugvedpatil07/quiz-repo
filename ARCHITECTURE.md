# Project Architecture Map (Frontend & Backend)

This document is here to make it **easy to see** exactly where your frontend and backend code lives within this monolithic Next.js repository.

Next.js is a "full-stack" framework, meaning your backend and frontend live together in the same project without the need to manage two separate servers.

---

## 🎨 FRONTEND (User Interface)

Everything your users see and interact with is located here:

- **Pages & Routes:** `src/app/`
  *(All folders inside `app` EXCEPT for the `api` folder are your frontend pages, like `/login`, `/dashboard`, etc.)*
- **UI Components:** `src/components/`
  *(Buttons, Navbars, Layouts, MatrixRain, etc.)*
- **Static Assets:** `public/`
  *(Images, fonts, favicons)*

---

## ⚙️ BACKEND (Server & Database)

All of your server-side logic, database connections, and secure APIs are located here:

- **API Routes (Your Server Endpoints):** `src/app/api/`
  *(This is the equivalent of an Express backend. It contains your endpoints like `/api/auth`, `/api/register`, etc.)*
- **Database Logic & Services:** `src/lib/`
  *(This contains your connection to Firebase, Prisma, Supabase, and gamification logic)*
- **Local Database Data:** `mock-db.json`
  *(The actual JSON file storing local user data)*

---

### How they communicate:
When a user clicks a button on your frontend (e.g., in `src/app/login/page.tsx`), the frontend component makes a network request to your backend route (e.g., `src/app/api/auth/route.ts`), which then talks to your database (using `src/lib/prisma.ts`).
