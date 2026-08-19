/**
 * Chatbot Client Module - Sakshi Bansal Portfolio
 */
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chatbotToggleBtn');
  const chatWindow = document.getElementById('chatbotWindow');
  const closeHeaderBtn = document.getElementById('chatbotCloseHeaderBtn');
  const iconOpen = document.getElementById('chatIconOpen');
  const iconClose = document.getElementById('chatIconClose');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const chips = document.querySelectorAll('.chat-chip');

  let sessionId = localStorage.getItem('sakshi_chat_session_id') || '';

  // Toggle Chat Window
  function toggleChat() {
    const isHidden = chatWindow.style.display === 'none' || !chatWindow.style.display;
    chatWindow.style.display = isHidden ? 'flex' : 'none';
    iconOpen.style.display = isHidden ? 'none' : 'block';
    iconClose.style.display = isHidden ? 'block' : 'none';

    if (isHidden && chatInput) {
      setTimeout(() => chatInput.focus(), 100);
    }
  }

  toggleBtn?.addEventListener('click', toggleChat);
  closeHeaderBtn?.addEventListener('click', toggleChat);

  // Append Message Bubble
  function appendMessage(text, sender = 'bot') {
    if (!chatMessages) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}-bubble`;

    if (sender === 'user') {
      bubble.style.cssText = `
        align-self: flex-end;
        max-width: 85%;
        background: var(--accent-white);
        color: var(--bg-primary);
        padding: 0.75rem 1rem;
        border-radius: var(--radius-md);
        font-size: 0.88rem;
        font-weight: 500;
        line-height: 1.5;
        box-shadow: var(--glow-white);
      `;
    } else {
      bubble.style.cssText = `
        align-self: flex-start;
        max-width: 85%;
        background: rgba(255,255,255,0.06);
        border: 1px solid var(--border-light);
        padding: 0.75rem 1rem;
        border-radius: var(--radius-md);
        font-size: 0.88rem;
        color: var(--accent-silver);
        line-height: 1.5;
      `;
    }

    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Send Message to Server API
  async function sendMessage(text) {
    if (!text.trim()) return;

    appendMessage(text, 'user');
    if (chatInput) chatInput.value = '';

    // Typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble bot-bubble typing';
    typingIndicator.style.cssText = 'align-self: flex-start; background: rgba(255,255,255,0.04); padding: 0.5rem 0.8rem; border-radius: 12px; font-size: 0.8rem; color: var(--text-muted);';
    typingIndicator.textContent = 'Thinking...';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: sessionId })
      });

      const data = await response.json();
      typingIndicator.remove();

      if (response.ok && data.reply) {
        if (data.sessionId) {
          sessionId = data.sessionId;
          localStorage.setItem('sakshi_chat_session_id', sessionId);
        }
        appendMessage(data.reply, 'bot');
      } else {
        appendMessage("I'm having trouble connecting right now. Please try emailing sakshibansal425@gmail.com!", 'bot');
      }
    } catch (err) {
      typingIndicator.remove();
      appendMessage("Unable to reach server. Please check your network connection.", 'bot');
    }
  }

  // Form Submit
  chatForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput?.value || '';
    sendMessage(query);
  });

  // Chip Clicks
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query) sendMessage(query);
    });
  });
});
