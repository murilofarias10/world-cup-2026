import { chat } from '../services/chatService.js';

export async function sendMessage(req, res) {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = await chat(message.trim());
    return res.json(result);
  } catch (err) {
    console.error('Chat error:', err.message);
    return res.status(500).json({ error: 'Chat request failed' });
  }
}
