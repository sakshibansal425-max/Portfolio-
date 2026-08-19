const prisma = require('../config/db');

// Knowledge base rules & responses
const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ['who', 'sakshi', 'background', 'about', 'intro', 'bio'],
    response: "Sakshi Bansal is a Fullstack Software Developer & Competitive Govt Exam Aspirant. She builds robust web applications using Node.js, Express, and SQL databases while preparing for government competitive examinations."
  },
  {
    keywords: ['skill', 'stack', 'technologies', 'node', 'sql', 'express', 'css', 'javascript'],
    response: "Sakshi's core technical stack includes Node.js (v20+), Express.js REST APIs, SQL Databases (SQLite, PostgreSQL via Prisma ORM), Vanilla HTML5/CSS3 custom design tokens, and Algorithmic Problem Solving."
  },
  {
    keywords: ['exam', 'govt', 'government', 'aspirant', 'upsc', 'ssc', 'competitive'],
    response: "Sakshi is preparing for Indian Competitive Government Examinations alongside her passion for software engineering. She brings structured discipline, analytical logic, and administrative clarity to all her projects."
  },
  {
    keywords: ['service', 'services', 'hire', 'freelance', 'build', 'offer', 'work'],
    response: "Sakshi offers 4 specialized engineering services: 1) Fullstack Web Application Development, 2) Database Architecture & SQL Optimization, 3) Custom Monochromatic Parallax UI/UX Design, and 4) Algorithmic Logic & Code Reviews."
  },
  {
    keywords: ['contact', 'email', 'reach', 'touch', 'message', 'hire'],
    response: "You can reach Sakshi directly via email at sakshibansal425@gmail.com or by filling out the Contact form on this website. All inquiries are saved to her database and answered within 24 hours."
  },
  {
    keywords: ['admin', 'dashboard', 'panel', 'login'],
    response: "The website includes a secure, auth-protected Admin Dashboard at /admin/login where contact submissions can be managed, reviewed, starred, or deleted."
  },
  {
    keywords: ['project', 'portfolio', 'code', 'github', 'architecture'],
    response: "Featured work includes this Monochromatic Parallax Portfolio, an Express + SQLite Submissions & Admin System, and an interactive Sidekick Assistant Chatbot widget."
  }
];

const DEFAULT_RESPONSE = "I'm Sakshi's Sidekick AI Assistant! You can ask me about her software background, technical skills, competitive exam goals, services offered, or how to get in touch. Try clicking one of the quick chips below!";

/**
 * Chatbot API Message Handler
 */
async function handleChat(req, res) {
  try {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Message content is required.' });
    }

    const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    // Get or Create Chat Session in DB
    let chatSession = await prisma.chatSession.findUnique({
      where: { sessionId: currentSessionId }
    });

    if (!chatSession) {
      chatSession = await prisma.chatSession.create({
        data: {
          sessionId: currentSessionId,
          userIp: String(userIp)
        }
      });
    }

    // Save Visitor Message in DB
    await prisma.chatMessage.create({
      data: {
        sessionId: chatSession.id,
        sender: 'user',
        messageText: message.trim()
      }
    });

    // Determine Response via Keyword Matching Engine
    const queryLower = message.toLowerCase();
    let replyText = DEFAULT_RESPONSE;

    for (const rule of FAQ_KNOWLEDGE_BASE) {
      const match = rule.keywords.some(kw => queryLower.includes(kw));
      if (match) {
        replyText = rule.response;
        break;
      }
    }

    // Save Assistant Response in DB
    await prisma.chatMessage.create({
      data: {
        sessionId: chatSession.id,
        sender: 'assistant',
        messageText: replyText
      }
    });

    return res.json({
      success: true,
      sessionId: currentSessionId,
      reply: replyText,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error handling chatbot request:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process chat message.'
    });
  }
}

module.exports = {
  handleChat
};
