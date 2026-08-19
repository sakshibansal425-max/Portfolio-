# Design System Specification

## 1. Aesthetic Vision & Design Philosophy
* **Theme:** Premium Monochromatic Parallax Elegance.
* **Core Feel:** Ultra-sleek, deep-space dark obsidian tones combined with crisp pure white typography, subtle glassmorphism borders, and smooth multi-depth parallax scroll dynamics.
* **Target Visual Impression:** Minimalist, high-end engineering precision—designed to immediately captivate tech recruiters and developers.

---

## 2. Color Palette & Tokens

```css
:root {
  /* Core Monochromatic Palette */
  --bg-primary: #08080A;          /* Deepest obsidian black */
  --bg-secondary: #121216;        /* Subtle slate-grey panel background */
  --bg-card: rgba(22, 22, 28, 0.7);/* Glassmorphism translucent card */
  --bg-card-hover: rgba(30, 30, 40, 0.85);

  /* Borders & Accents */
  --border-light: rgba(255, 255, 255, 0.12);
  --border-active: rgba(255, 255, 255, 0.4);
  --accent-white: #FFFFFF;
  --accent-silver: #E2E8F0;
  --text-muted: #94A3B8;
  --text-dim: #64748B;

  /* Shadows & Glows */
  --glow-white: 0 0 25px rgba(255, 255, 255, 0.15);
  --shadow-card: 0 10px 30px rgba(0, 0, 0, 0.5);

  /* Typography */
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-code: 'JetBrains Mono', monospace;
}
```

---

## 3. Typography Hierarchy

| Style | Element | Font Family | Weight | Size (Desktop) | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `<h1>` | Outfit | 800 (Bold) | `4.5rem` (72px) | 1.1 |
| **Section Title** | `<h2>` | Outfit | 700 (SemiBold) | `2.5rem` (40px) | 1.2 |
| **Card Title** | `<h3>` | Outfit | 600 (Medium) | `1.5rem` (24px) | 1.3 |
| **Body Text** | `<p>` | Inter | 400 (Regular) | `1.05rem` (17px) | 1.6 |
| **Subtext / Muted** | `<span>` | Inter | 400 | `0.9rem` (14.4px) | 1.5 |
| **Code Snippets** | `<code>` | JetBrains Mono | 500 | `0.95rem` (15px) | 1.4 |

---

## 4. Page-by-Page Detailed UI Specifications

### Page 1: Home Page (`/`)
* **Hero Section:** Parallax background grid with subtle floating geometric stars/particles, grand monochromatic headline: *"Engineering Solutions. Mastering Code."*, sub-headline introducing Sakshi Bansal.
* **Interactive Stats Counter:** Key metrics (Projects Completed, Govt Exam Milestones, Code Commits, Problem Sets Solved).
* **Featured Showcase:** 3D hover-tilt glassmorphism project cards highlighting key software engineering work.
* **Call To Action (CTA):** "Explore My Work", "Contact Me", and "Chat with AI Assistant".

### Page 2: About Us Page (`/about`)
* **Story & Journey Section:** Dedicated narrative detailing Sakshi's dual journey—preparing for Indian Competitive Government Exams while building advanced web apps and mastering Node.js & SQL.
* **Interactive Skill Radar & Badges:** Technical skill badges (Node.js, Express, SQL, HTML5/CSS3, Algorithm Design, Git, Architecture).
* **Interactive Timeline:** Horizontal / vertical timeline highlighting key milestones in coding & academics.

### Page 3: Services Page (`/services`)
* **Service Cards (Grid Layout):**
  1. *Full-Stack Web Application Development* (Node.js, SQL local DB, custom APIs).
  2. *Custom Parallax & UI/UX Frontend Design* (Pure CSS, micro-animations, glassmorphism).
  3. *Database Architecture & SQL Optimization* (Schema modeling, ER design, relational querying).
  4. *Algorithmic Problem Solving & Mentorship* (Logic development, code reviews).
* **Process Section:** Step-by-step workflow: Requirements -> System Architecture -> Development -> QA & Verification -> Deployment.

### Page 4: Contact Us Page (`/contact`)
* **Left Column:** Contact details, email ([sakshibansal425@gmail.com](mailto:sakshibansal425@gmail.com)), response time expectation, social links (GitHub, LinkedIn).
* **Right Column:** Monochromatic Glassmorphism Form:
  * Name field
  * Email field
  * Subject dropdown/text field
  * Message textarea
  * Animated "Send Message" button with micro-spinner and success checkmark.

### Page 5: Admin Submissions Dashboard (`/admin`)
* **Authentication Screen:** Sleek dark modal form to log into the Admin portal.
* **Submissions Data Table:** Clean dark data grid featuring search, status filter (Unread/Read), delete action, modal popup to read full message text, and export capabilities.

### Global Widget: AI Assistant Chatbot (Side Floating Widget)
* Positioned at bottom-right of every page.
* Expandable chat window with monochromatic dark theme, animated typing indicator, quick question chips ("Who is Sakshi?", "What are her tech skills?", "How to contact her?").

---

## 5. Parallax & Micro-Interaction Rules
1. **Depth Multipliers:** Background layers scroll at `0.2x` speed, middle decorative elements at `0.5x` speed, foreground text at `1.0x` speed.
2. **Hover States:** Buttons expand slightly (`transform: translateY(-3px) scale(1.02)`) with a white soft glow shadow (`box-shadow: var(--glow-white)`).
3. **Card Transitions:** Smooth 300ms cubic-bezier transition on all hover effects.
