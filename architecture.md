# System Architecture & Database Design

## 1. High-Level Architecture Overview

### 1D Component Diagram (Layered Pipeline)
```
[Client Browser] <---> [Node.js Express Server] <---> [Local SQLite Database Engine]
```

### 2D Architectural Layout Diagram
```
+-----------------------------------------------------------------------------------+
|                                 CLIENT SIDE BROWSER                               |
| +-------------------+  +-------------------+  +------------------+  +-----------+ |
| | Home / About /    |  | Parallax Engine & |  | Side Chatbot UI  |  | Admin UI  | |
| | Services / Contact|  | CSS Design System |  | Widget           |  | Dashboard | |
| +-------------------+  +-------------------+  +------------------+  +-----------+ |
+-----------------------------------------------------------------------------------+
                                          |
                      HTTP GET / POST (REST API & Page Routes)
                                          v
+-----------------------------------------------------------------------------------+
|                               NODE.JS BACKEND SERVER                              |
| +-------------------------------------------------------------------------------+ |
| | Express App Core Router (server.js)                                           | |
| | - Static File Middleware (Public Assets, CSS, JS)                             | |
| | - API Controller (/api/contact, /api/admin/login, /api/admin/submissions)     | |
| | - Auth Middleware (Session/JWT Admin Validation)                              | |
| | - Chatbot Intelligence API (/api/chat)                                        | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
                                          |
                              Native SQLite / SQL Driver
                                          v
+-----------------------------------------------------------------------------------+
|                              LOCAL SQL DATABASE (SQLite)                          |
| +--------------------------+  +-------------------------+  +--------------------+ |
| | contacts                 |  | admin_users             |  | chat_logs          | |
| +--------------------------+  +-------------------------+  +--------------------+ |
+-----------------------------------------------------------------------------------+
```

---

## 2. Entity-Relationship (ER) Diagram

```mermaid
erDiagram
    CONTACT_SUBMISSION {
        INTEGER id PK
        STRING name
        STRING email
        STRING subject
        TEXT message
        STRING status
        TIMESTAMP created_at
    }

    ADMIN_USER {
        INTEGER id PK
        STRING username
        STRING email
        STRING password_hash
        TIMESTAMP last_login
    }

    CHAT_SESSION {
        INTEGER id PK
        STRING session_id
        STRING user_ip
        TIMESTAMP started_at
    }

    CHAT_MESSAGE {
        INTEGER id PK
        INTEGER session_id FK
        STRING sender
        TEXT message_text
        TIMESTAMP created_at
    }

    ADMIN_USER ||--o{ CONTACT_SUBMISSION : "manages & reviews"
    CHAT_SESSION ||--o{ CHAT_MESSAGE : "contains"
```

---

## 3. Enhanced Entity-Relationship (EER) Diagram

```mermaid
erDiagram
    USER_ENTITIES {
        INTEGER entity_id PK
        STRING entity_type
        TIMESTAMP created_at
    }

    CONTACT_SUBMISSION {
        INTEGER id PK
        INTEGER entity_id FK
        STRING name
        STRING email
        STRING subject
        TEXT message
        STRING status
        STRING ip_address
        BOOLEAN is_starred
    }

    ADMIN_USER {
        INTEGER id PK
        INTEGER entity_id FK
        STRING username
        STRING email
        STRING password_hash
        STRING role
    }

    SYSTEM_AUDIT_LOG {
        INTEGER log_id PK
        INTEGER admin_id FK
        STRING action_taken
        TIMESTAMP timestamp
    }

    USER_ENTITIES ||--|| CONTACT_SUBMISSION : "specializes to"
    USER_ENTITIES ||--|| ADMIN_USER : "specializes to"
    ADMIN_USER ||--o{ SYSTEM_AUDIT_LOG : "records actions"
```

---

## 4. User Flow & System Interaction Sequences

### A. Contact Form Submission Flow
```mermaid
sequenceDiagram
    autonumber
    actor Visitor
    participant Frontend as Parallax UI
    participant Backend as Node.js Express API
    participant DB as Local SQL Database

    Visitor->>Frontend: Fills out Contact Form (Name, Email, Subject, Message)
    Visitor->>Frontend: Clicks "Send Message"
    Frontend->>Frontend: Client-side validation (Email format, Non-empty fields)
    Frontend->>Backend: POST /api/contact {name, email, subject, message}
    Backend->>Backend: Server-side validation & XSS Sanitization
    Backend->>DB: INSERT INTO contacts (name, email, subject, message, status, created_at)
    DB-->>Backend: Success Confirmation (ID: 101)
    Backend-->>Frontend: HTTP 201 Created {success: true, message: "Thank you!"}
    Frontend->>Visitor: Displays Monochromatic Toast Notification
```

### B. Admin Panel Operations Flow
```mermaid
sequenceDiagram
    autonumber
    actor Sakshi as Admin (Sakshi)
    participant AdminUI as Admin Dashboard
    participant Backend as Node.js Express API
    participant DB as Local SQL Database

    Sakshi->>AdminUI: Navigates to /admin/login
    Sakshi->>AdminUI: Submits credentials
    AdminUI->>Backend: POST /api/admin/login {username, password}
    Backend->>DB: SELECT * FROM admin_users WHERE username = ?
    DB-->>Backend: Admin record + hashed password
    Backend->>Backend: Verify password hash (bcrypt)
    Backend-->>AdminUI: Set Session Cookie / JWT Auth Token
    AdminUI->>Backend: GET /api/admin/submissions (Auth Header)
    Backend->>DB: SELECT * FROM contacts ORDER BY created_at DESC
    DB-->>Backend: List of contact form entries
    Backend-->>AdminUI: JSON response with submissions
    AdminUI->>Sakshi: Renders Submissions Data Table
```
