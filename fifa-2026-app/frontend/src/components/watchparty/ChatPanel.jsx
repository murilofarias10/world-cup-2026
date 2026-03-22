import { useState, useRef, useEffect } from 'react';

// ── Mock seed messages ────────────────────────────────────────────
// Swap for a real WebSocket / Supabase Realtime subscription later.

function buildMockMessages(matchTitle) {
  const now = Date.now();
  return [
    {
      id: 'm1',
      username: 'FutbolFan88',
      avatar: 'F',
      text: `Who else is pumped for ${matchTitle}?! 🔥`,
      ts: now - 18 * 60_000,
    },
    {
      id: 'm2',
      username: 'SoccerMom',
      avatar: 'S',
      text: 'Already grabbed my seat at Golazo Lounge. Best screens in town.',
      ts: now - 15 * 60_000,
    },
    {
      id: 'm3',
      username: 'GoalMachine',
      avatar: 'G',
      text: 'Predicting 2-1. First goal in the 34th minute — mark my words.',
      ts: now - 11 * 60_000,
    },
    {
      id: 'm4',
      username: 'TifoTerrace',
      avatar: 'T',
      text: 'The Corner Flag Café has half-price nachos during the match. Just saying 🧀',
      ts: now - 8 * 60_000,
    },
    {
      id: 'm5',
      username: 'OffsideTrap',
      avatar: 'O',
      text: 'Anyone know if The Globe Sports Bar has reserved tables? Going with 6 people.',
      ts: now - 5 * 60_000,
    },
    {
      id: 'm6',
      username: 'FutbolFan88',
      avatar: 'F',
      text: 'They do! Call ahead though — fills up fast for big games.',
      ts: now - 3 * 60_000,
    },
  ];
}

// ── Helpers ──────────────────────────────────────────────────────

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

const AVATAR_COLORS = [
  '#e63946', '#2a9d8f', '#e9c46a', '#264653',
  '#f4a261', '#6366f1', '#16a34a', '#db2777',
];

function avatarColor(username) {
  let hash = 0;
  for (const c of username) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ── Pre-join gate ─────────────────────────────────────────────────

function JoinGate({ memberCount, onJoin }) {
  return (
    <div className="wp-chat-gate">
      <div className="wp-chat-gate-icon">💬</div>
      <h3 className="wp-chat-gate-title">Match Channel</h3>
      <p className="wp-chat-gate-desc">
        Join the conversation with other fans watching this match.
        Share tips, predictions, and venue info in real time.
      </p>
      <div className="wp-chat-gate-count">
        <span className="wp-chat-gate-dot" />
        <span><strong>{memberCount}</strong> people in this channel</span>
      </div>
      <button className="wp-chat-gate-btn" onClick={onJoin}>
        Join Channel
      </button>
    </div>
  );
}

// ── ChatPanel component ───────────────────────────────────────────

function ChatPanel({ matchTitle }) {
  const [joined,   setJoined]   = useState(false);
  const [messages, setMessages] = useState(() => buildMockMessages(matchTitle));
  const [draft,    setDraft]    = useState('');
  const listRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (!joined) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, joined]);

  function handleJoin() {
    setJoined(true);
    // Append a system join message
    setMessages((prev) => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        username: '__system__',
        avatar: '•',
        text: 'You joined the channel.',
        ts: Date.now(),
      },
    ]);
  }

  function handleLeave() {
    setJoined(false);
    setDraft('');
    setMessages((prev) => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        username: '__system__',
        avatar: '•',
        text: 'You left the channel.',
        ts: Date.now(),
      },
    ]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        username: 'You',
        avatar: 'Y',
        text,
        ts: Date.now(),
      },
    ]);
    setDraft('');
  }

  // Count non-system messages as proxy for active members
  const memberCount = messages.filter((m) => m.username !== '__system__').length + 14;

  if (!joined) {
    return (
      <div className="wp-chat">
        <JoinGate memberCount={memberCount} onJoin={handleJoin} />
      </div>
    );
  }

  return (
    <div className="wp-chat">
      <div className="wp-chat-header">
        <span className="wp-chat-header-icon">💬</span>
        <div>
          <h3 className="wp-chat-title">Match Channel</h3>
          <p className="wp-chat-sub">{matchTitle}</p>
        </div>
        <div className="wp-chat-header-right">
          <span className="wp-chat-online">
            <span className="wp-chat-dot" />
            {memberCount} active
          </span>
          <button
            className="wp-chat-leave-btn"
            onClick={handleLeave}
            title="Leave channel"
          >
            Leave
          </button>
        </div>
      </div>

      <div className="wp-chat-messages" ref={listRef} aria-live="polite">
        {messages.map((msg) => {
          if (msg.username === '__system__') {
            return (
              <div key={msg.id} className="wp-chat-system">
                {msg.text}
              </div>
            );
          }
          return (
            <div
              key={msg.id}
              className={`wp-chat-msg${msg.username === 'You' ? ' wp-chat-msg--self' : ''}`}
            >
              <span
                className="wp-chat-avatar"
                style={{ background: avatarColor(msg.username) }}
                aria-hidden="true"
              >
                {msg.avatar}
              </span>
              <div className="wp-chat-bubble">
                <div className="wp-chat-meta">
                  <span className="wp-chat-username">{msg.username}</span>
                  <span className="wp-chat-ts">{formatTime(msg.ts)}</span>
                </div>
                <p className="wp-chat-text">{msg.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <form className="wp-chat-form" onSubmit={sendMessage}>
        <input
          className="wp-chat-input"
          type="text"
          placeholder="Say something…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          aria-label="Chat message"
        />
        <button
          type="submit"
          className="wp-chat-send"
          disabled={!draft.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatPanel;
