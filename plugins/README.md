# Sakshi Portfolio - Extensible Plugin Architecture

This directory defines the modular plugin architecture for expanding Sakshi Bansal's portfolio site with new features in future phases.

## Modular Architecture Principles

1. **Decoupled API Controllers:** Every plugin registers its own router under `src/routes/` or `plugins/<plugin_name>/index.js`.
2. **Database Extensibility:** Prisma schema (`prisma/schema.prisma`) allows adding new models (e.g., `Post`, `Project`, `AnalyticsEvent`) without modifying existing `contacts` or `admin_users` models.
3. **Template Partials:** New visual features (e.g., Blog Widget, External Live Feeds) can be included via `<%- include(...) %>` in `views/layouts/main.ejs`.

## Example Plugins to Add in Future Phases

### 1. Blog & Technical Writing Plugin (`plugins/blog/`)
- SQLite Table: `posts` (`id`, `title`, `slug`, `content`, `published_at`)
- Routes: `GET /blog`, `GET /blog/:slug`
- Views: `views/blog/index.ejs`, `views/blog/post.ejs`

### 2. AI Vector Chatbot Plugin (`plugins/ai-agent/`)
- Upgrade local rule-based chatbot to OpenAI / Gemini RAG agent.
- Connect via `src/controllers/chatController.js` fallback handler.
