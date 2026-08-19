# Project Phase Roadmap

## Phase Overview

```
+-------------------------------------------------------------------------------+
| PHASE 1: Requirements, Specs & Architecture Documentation (COMPLETED)         |
+-------------------------------------------------------------------------------+
                                       |
                                       v
+-------------------------------------------------------------------------------+
| PHASE 2: Core Node.js Backend & Local SQL Database Setup (IN PROGRESS)        |
+-------------------------------------------------------------------------------+
                                       |
                                       v
+-------------------------------------------------------------------------------+
| PHASE 3: Monochromatic Parallax Design System & Core Pages (Home/About/etc)   |
+-------------------------------------------------------------------------------+
                                       |
                                       v
+-------------------------------------------------------------------------------+
| PHASE 4: Admin Submissions Dashboard & Sidekick AI Chatbot Widget             |
+-------------------------------------------------------------------------------+
                                       |
                                       v
+-------------------------------------------------------------------------------+
| PHASE 5: Google Analytics Event Integration & Extensibility Architecture      |
+-------------------------------------------------------------------------------+
                                       |
                                       v
+-------------------------------------------------------------------------------+
| PHASE 6: E2E Automated Verification & Launch Preparation                      |
+-------------------------------------------------------------------------------+
```

---

## Phase Breakdown & Deliverables

### Phase 1: Specifications & Documentation
- [x] Create Product Requirement Document (`prd.md`)
- [x] Create Architecture Document (`architecture.md`) with ER & EER diagrams
- [x] Create Design System Specification (`design.md`)
- [x] Create Phase Breakdown Document (`phase.md`)
- [x] Create AI Memory Tracking Document (`memory.md`)

### Phase 2: Core Node.js Server & SQL Database
- [ ] Initialize Node.js application (`package.json`, Express.js dependency setup)
- [ ] Set up local SQLite database connection & schema migrations (`contacts`, `admin_users`, `chat_logs` tables)
- [ ] Create seed scripts for default Admin credentials (username: `admin`, initial password hashing)
- [ ] Implement REST API endpoints:
  - `POST /api/contact` - Validate & store visitor contact form submission
  - `POST /api/admin/login` - Admin session/token authentication
  - `GET /api/admin/submissions` - Retrieve submissions list
  - `PUT /api/admin/submissions/:id` - Mark submission as read/starred
  - `DELETE /api/admin/submissions/:id` - Delete submission

### Phase 3: Monochromatic Parallax Design System & Pages
- [ ] Implement global CSS tokens (`styles.css`) for dark monochromatic theme & glassmorphism
- [ ] Build custom JS Parallax Scroll Engine (`parallax.js`) for multi-depth visual effects
- [ ] Build Home Page (`/`) with Hero parallax, animated tech metrics, featured project cards
- [ ] Build About Us Page (`/about`) featuring Sakshi's coding journey & Govt Exam preparation story
- [ ] Build Services Page (`/services`) showcasing full-stack dev services & methodology
- [ ] Build Contact Us Page (`/contact`) with interactive glassmorphism form & AJAX submission

### Phase 4: Admin Panel & Interactive Side Chatbot Widget
- [ ] Build Admin Login Modal & Submissions Management Panel (`/admin`)
- [ ] Build expandable Side AI Assistant Chatbot widget (`chatbot.js`) with instant automated responses about Sakshi's bio, skills, and availability.

### Phase 5: Google Analytics & Modular Plugins
- [ ] Integrate Google Analytics 4 (GA4) snippet tag & custom event hooks (form submission events, chatbot opens, project card clicks)
- [ ] Design modular plugin system structure (`plugins/` directory) for future integrations (NoSQL, Vector DBs / RAG AI agents).

### Phase 6: End-to-End Verification & Verification
- [ ] Run full system server startup check
- [ ] Execute automated database CRUD tests & API endpoint verification
- [ ] Verify responsive glassmorphism parallax aesthetics across desktop and mobile viewports
- [ ] Finalize Walkthrough documentation (`walkthrough.md`)
