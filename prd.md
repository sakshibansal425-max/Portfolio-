# Product Requirement Document (PRD)

## 1. Introduction
**Project Name:** Sakshi Bansal - Developer & Tech Portfolio
**Owner:** Sakshi Bansal ([sakshibansal425@gmail.com](mailto:sakshibansal425@gmail.com))
**Background:** Sakshi is preparing for competitive government examinations while simultaneously mastering modern full-stack software development. This portfolio website serves as an interactive, high-impact digital presence designed to wow recruiters, hiring managers, and senior developers.

## 2. Target Audience & Primary Use Cases
* **Recruiters & Hiring Managers:** Evaluating core technical skills, project showcase, contact response, and problem-solving mindset.
* **Peer Developers & Tech Community:** Reviewing clean code practices, architectural documentation, and design aesthetics.
* **Visitors & Potential Collaborators:** Inquiring about services, coding mentorship, or freelance tech projects.

## 3. Key Features
1. **Monochromatic Parallax Hero & Content Sections:** Smooth depth-scrolling visual elements, minimalist high-contrast typography, and dark-mode elegance.
2. **Core Pages:**
   * **Home Page:** Hero section with dynamic parallax layers, quick bio, featured project cards, call-to-actions.
   * **About Us Page:** Detailed personal journey (Govt Exam Aspirant + Passionate Programmer), skills matrix, educational timeline, coding achievements.
   * **Services Page:** Specialized services (Fullstack Web Development, API Architecture, SQL Database Design, Problem Solving & Logic Development).
   * **Contact Us Page:** Interactive contact form with real-time field validation.
3. **Local SQL Database Persistence:** Form submission stored securely in a local SQL database (SQLite with Node.js backend).
4. **Admin Panel:** Secure dashboard to view, filter, mark as read, and delete contact form inquiries.
5. **Interactive Side Chatbot Widget:** Conversational assistant widget available on all pages to answer visitor FAQs about Sakshi's background, skills, and availability.
6. **Google Analytics Integration:** Embedded tracking script configuration with customizable event triggers to analyze user behavior, page views, and conversion rates.
7. **Modular & Extensible Architecture:** Plug-and-play structure allowing seamless addition of new pages, features, or external services in future phases.

---

## 4. Technology Stack Specification

```
+-----------------------------------------------------------------------+
|                           FRONTEND LAYER                              |
|   - HTML5 / CSS3 / Vanilla Modern JavaScript Engine                   |
|   - Custom Monochromatic Parallax CSS & Smooth Scroll Animations       |
|   - Interactive Sidekick Chatbot UI Widget                           |
+-----------------------------------------------------------------------+
                                   |
                                   v  (REST APIs / Dynamic SSR Engine)
+-----------------------------------------------------------------------+
|                           BACKEND LAYER                               |
|   - Node.js runtime environment                                       |
|   - Express.js Web Framework & API Server                             |
|   - Session & Auth middleware for Admin Access                        |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                          DATABASE LAYER                               |
|   - Primary Local SQL DB: SQLite3 / Better-SQLite3                    |
|   - ORM / Driver: Native SQL Queries / Kysely Query Builder           |
+-----------------------------------------------------------------------+
```

### Stack Comparison & Future Scalability Options

| Category | Primary Choice (Implemented) | Scalable Alternatives (Cloud / Enterprise) |
| :--- | :--- | :--- |
| **Backend & Frontend** | **Node.js + Express + HTML5/CSS3/JS** | Next.js / Remix fullstack frameworks |
| **SQL Databases** | **SQLite (Local DB)** | Supabase (PostgreSQL), Cloud PostgreSQL, Firebase Firestore |
| **NoSQL / Graph Databases** | N/A (Optional Future Plugin) | Neo4j (Graph relations), MongoDB, DynamoDB |
| **RAG / Vector Databases** | N/A (Optional Future Plugin) | Pinecone, ChromaDB, FAISS, Weaviate, Vectorless Search Engines |

---

## 5. Non-Functional Requirements
* **Performance:** Sub-1-second initial load time; 60fps smooth parallax animations.
* **Security:** Input sanitization against XSS & SQL Injection; password hashing (bcrypt/argon2) for Admin authentication.
* **Responsiveness:** Fully mobile-responsive, tablet-optimized, and desktop-optimized layout.
* **SEO & Analytics:** OpenGraph meta tags, semantic HTML tags, Google Analytics scripts.
