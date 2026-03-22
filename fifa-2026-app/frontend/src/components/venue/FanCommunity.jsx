import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_COMMENTS = [
  { id: 1, user: 'TiffanyM',   avatar: '🇨🇦', text: 'Can\'t wait! I\'ve reserved 8 seats here for the opening match. The poutine flights are AMAZING.',      time: '2h ago' },
  { id: 2, user: 'Carlos_FIFA',avatar: '🇲🇽', text: 'Coming all the way from Mexico City for this. Best decision I ever made. See you all there! 🙌',       time: '3h ago' },
  { id: 3, user: 'LondonFan',  avatar: '🇬🇧', text: 'Visited last time I was in the city and the atmosphere was incredible. Highly recommend getting there early.', time: '5h ago' },
];

export default function FanCommunity({ venue, matchId }) {
  const navigate    = useNavigate();
  const [joined, setJoined] = useState(false);

  function handleJoin() {
    setJoined(true);
    if (matchId) {
      navigate(`/watch-party/${matchId}`);
    }
  }

  return (
    <section className="fco-root">
      <div className="fco-header">
        <h2 className="fco-title">Fan Community</h2>
        <p className="fco-sub">Connect with fans who are planning to watch here</p>
      </div>

      {/* ── Stats row ── */}
      <div className="fco-stats">
        <div className="fco-stat">
          <span className="fco-stat-num">{venue.interestedCount}</span>
          <span className="fco-stat-label">Interested</span>
        </div>
        <div className="fco-stat fco-stat--attending">
          <span className="fco-stat-num">{venue.attendingCount ?? Math.floor(venue.interestedCount * 0.6)}</span>
          <span className="fco-stat-label">Attending</span>
        </div>
        <div className="fco-stat">
          <span className="fco-stat-num">{Math.floor((venue.attendingCount ?? venue.interestedCount) * 0.4)}</span>
          <span className="fco-stat-label">Discussing</span>
        </div>
      </div>

      {/* ── Discussion preview ── */}
      <div className="fco-comments">
        {MOCK_COMMENTS.map((c) => (
          <div key={c.id} className="fco-comment">
            <div className="fco-comment-avatar">{c.avatar}</div>
            <div className="fco-comment-body">
              <div className="fco-comment-meta">
                <span className="fco-comment-user">{c.user}</span>
                <span className="fco-comment-time">{c.time}</span>
              </div>
              <p className="fco-comment-text">{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      {!joined ? (
        <button className="fco-join-btn" onClick={handleJoin}>
          💬 Join Venue Chat
        </button>
      ) : (
        <div className="fco-joined">
          <span className="fco-joined-icon">✅</span>
          <span>You've joined the fan community for this venue!</span>
        </div>
      )}
    </section>
  );
}
