# AI Agent & Developer Context Memory Log

## 1. Project Profile & Invariants
* **Owner:** Sakshi Bansal
* **Email:** [sakshibansal425@gmail.com](mailto:sakshibansal425@gmail.com)
* **Goal:** Premium monochromatic parallax portfolio website to present full-stack engineering expertise to tech recruiters and developers while balancing competitive Govt Exam preparation.
* **Tech Stack Invariants:**
  * **Runtime:** Node.js (v20+)
  * **Server Framework:** Express.js + EJS View Engine (`express-ejs-layouts`)
  * **Database:** Local SQL Database (SQLite via Prisma ORM)
  * **Frontend:** Vanilla HTML5, CSS3 Custom Properties, Parallax JS Engine (`parallax.js`)
  * **Theme:** Dark Obsidian Monochromatic Parallax with Glassmorphism (`#08080A`)
  * **Security:** Input sanitization (XSS protection), SQL parameterization, bcrypt password hashing.

---

## 2. Phase Execution State Log

| Phase | Description | Status | Key Decisions & Notes |
| :--- | :--- | :--- | :--- |
| **Phase 0** | Setup & Foundation | **COMPLETED** | Initialized project structure, Express app, EJS layout engine, Prisma SQLite DB schema (`dev.db`), `.env`, seed script (`admin` / `sakshi2026`), design tokens, and verified page stubs. |
| **Phase 1** | Monochromatic Parallax UI & Core Pages | **COMPLETED** | Built multi-depth JS parallax engine (`parallax.js`), 3D card tilt, animated stats counter, and rich views for Home, About, Services, and Contact pages. |
| **Phase 2** | Backend API & Database Persistence | **COMPLETED** | Implemented `POST /api/contact` with server-side validation, XSS sanitization, and SQLite persistence via Prisma. |
| **Phase 3** | Admin Panel & Chatbot Widget | **COMPLETED** | Auth-protected Admin Dashboard (`/admin/dashboard`) with data table, status filters, modal preview, starring, and deletion. Sidekick Chatbot widget with FAQ engine and SQLite chat logging. |
| **Phase 4** | Analytics & Extensibility | **COMPLETED** | Integrated GA4 event tracking script (`analytics.js`) and established plugin architecture in `plugins/`. |
| **Phase 5** | End-to-End Verification | **COMPLETED** | Executed automated verification of API endpoints, session auth, DB CRUD operations, and front-end layout rendering. |

---

## 3. Key Architectural Decisions Log
1. **Node.js Fullstack + EJS Choice:** Keeps the codebase lightweight, dependency-light, extremely fast, completely customizable, and server-side rendered without heavy SPA framework overhead.
2. **Prisma ORM with Local SQLite DB:** Ensures zero-cost, zero-maintenance local relational storage for contact form submissions, admin credentials, and chat sessions with type-safe schema migrations.
3. **Monochromatic Obsidian Design Tokens:** Strict CSS variable design system (`#08080A` obsidian background, glassmorphic cards, Outfit / Inter / JetBrains Mono typography) adhering to `design.md`.
4. **Custom Parallax Engine:** Built zero-dependency vanilla JS engine handling scroll speed ratios (`0.2x` grid background, `0.5x` star particles, `1.0x` content) and 3D card tilt physics.
5. **Session Security & XSS Protection:** Protected admin routes with session cookies (`connect.sid`), bcrypt password hashing, and HTML entity escaping.

---

## 4. Final Session Log (August 6, 2026)
* **All Implementations Completed:**
  * Created `src/controllers/contactController.js` handling message validation, XSS escaping, and Prisma `Contact` insertion.
  * Created `src/controllers/adminController.js` handling login, logout, submission retrieval, status update, and deletion.
  * Created `src/controllers/chatController.js` handling FAQ intent parsing and SQLite logging for `ChatSession` and `ChatMessage`.
  * Created `src/middleware/auth.js` enforcing session authentication for admin endpoints and `/admin/dashboard`.
  * Built `views/admin/dashboard.ejs` with submission table, filter tabs (All / Unread / Starred), search bar, message preview modal, starring, and deletion.
  * Built `views/partials/chatbot.ejs` and `public/js/chatbot.js` for expandable floating AI assistant widget.
  * Built `public/js/analytics.js` with GA4 event hooks for contact submissions, chatbot interactions, and project card clicks.
  * Created `plugins/README.md` defining extensibility guidelines for future modules (e.g. blog or LLM integration).
  * Executed full system verification: All page routes, API endpoints, SQLite persistence, and admin session auth verified 100% working.

---

## 5. Admin Credentials & Credentials Summary
* **Admin Login URL:** `http://localhost:3000/admin/login`
* **Username:** `admin`
* **Password:** `sakshi2026`
* **Email:** `sakshibansal425@gmail.com`
