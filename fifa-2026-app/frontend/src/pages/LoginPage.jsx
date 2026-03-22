import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../context/AuthContext.jsx';
import './LoginPage.css';

// ── "Choose action" initial screen ───────────────────────────────────────────
function ChoiceScreen({ onSelect }) {
  return (
    <div className="lp-choice">
      <div className="lp-logo">⚽</div>
      <h1 className="lp-title">FIFA World Cup 2026</h1>
      <p className="lp-subtitle">Fan App — Sign in to join the party</p>
      <div className="lp-choice-btns">
        <button className="btn-primary" onClick={() => onSelect('login')}>
          Log In
        </button>
        <button className="btn-secondary" onClick={() => onSelect('register')}>
          Create Account
        </button>
      </div>
    </div>
  );
}

// ── Login form ────────────────────────────────────────────────────────────────
function LoginForm({ onBack }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      navigate('/matches');
    }
  }

  return (
    <form className="lp-form" onSubmit={handleSubmit}>
      <button type="button" className="btn-back" onClick={onBack}>← Back</button>
      <h2 className="lp-form-title">Log In</h2>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}

// ── Register form ─────────────────────────────────────────────────────────────
function RegisterForm({ onBack }) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    name: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: '',
    agreedRespectful: false,
    agreedAge18: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function set(key) {
    return (e) =>
      setFields((prev) => ({
        ...prev,
        [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (fields.password !== fields.confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (fields.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    if (!fields.agreedRespectful || !fields.agreedAge18) {
      return setError('You must agree to both requirements to create an account.');
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email: fields.email,
      password: fields.password,
      options: {
        data: {
          name: fields.name,
          country: fields.country,
          agreed_respectful: fields.agreedRespectful,
          agreed_age_18: fields.agreedAge18,
        },
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      navigate('/matches');
    }
  }

  return (
    <form className="lp-form" onSubmit={handleSubmit}>
      <button type="button" className="btn-back" onClick={onBack}>← Back</button>
      <h2 className="lp-form-title">Create Account</h2>

      <div className="form-group">
        <label htmlFor="reg-name">Name</label>
        <input
          id="reg-name"
          type="text"
          placeholder="Your full name"
          value={fields.name}
          onChange={set('name')}
          required
          autoComplete="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="reg-email">Email</label>
        <input
          id="reg-email"
          type="email"
          placeholder="you@example.com"
          value={fields.email}
          onChange={set('email')}
          required
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="reg-country">Country</label>
        <input
          id="reg-country"
          type="text"
          placeholder="e.g. Brazil, USA, France…"
          value={fields.country}
          onChange={set('country')}
          required
          autoComplete="country-name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="reg-password">Password</label>
        <input
          id="reg-password"
          type="password"
          placeholder="Min. 6 characters"
          value={fields.password}
          onChange={set('password')}
          required
          autoComplete="new-password"
        />
      </div>

      <div className="form-group">
        <label htmlFor="reg-confirm">Confirm Password</label>
        <input
          id="reg-confirm"
          type="password"
          placeholder="Repeat your password"
          value={fields.confirmPassword}
          onChange={set('confirmPassword')}
          required
          autoComplete="new-password"
        />
      </div>

      <div className="lp-checkboxes">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={fields.agreedRespectful}
            onChange={set('agreedRespectful')}
            required
          />
          <span>I will be respectful with others</span>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={fields.agreedAge18}
            onChange={set('agreedAge18')}
            required
          />
          <span>I confirm that I am older than 18 years old</span>
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button
        type="submit"
        className="btn-primary"
        disabled={loading || !fields.agreedRespectful || !fields.agreedAge18}
      >
        {loading ? 'Creating account…' : 'Create Account'}
      </button>
    </form>
  );
}

// ── Logged-in welcome ──────────────────────────────────────────────────────────
function WelcomeScreen({ profile, onSignOut }) {
  return (
    <div className="lp-welcome">
      <div className="lp-avatar">{profile?.name?.[0]?.toUpperCase() ?? '?'}</div>
      <h2>Welcome back, {profile?.name ?? 'Fan'}!</h2>
      <p className="lp-welcome-email">{profile?.email}</p>
      {profile?.country && <p className="lp-welcome-country">🌍 {profile.country}</p>}
      <button className="btn-secondary lp-signout" onClick={onSignOut}>
        Sign Out
      </button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const { session, profile, signOut } = useAuth();
  const [view, setView] = useState('choice');

  if (session) {
    return (
      <div className="login-page">
        <div className="login-card">
          <WelcomeScreen profile={profile} onSignOut={signOut} />
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {view === 'choice' && <ChoiceScreen onSelect={setView} />}
        {view === 'login' && <LoginForm onBack={() => setView('choice')} />}
        {view === 'register' && <RegisterForm onBack={() => setView('choice')} />}
      </div>
    </div>
  );
}
