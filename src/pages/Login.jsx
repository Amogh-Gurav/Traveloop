import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Navigate to dashboard on submit
    navigate('/');
  };

  return (
    <div className="fullscreen-page">
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '420px',
          margin: '0 auto',
          boxShadow: '0 30px 60px rgba(0,0,0,.25)',
          padding: '48px 40px',
        }}
      >
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #714B67, #9b6d8f)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              margin: '0 auto 16px',
              boxShadow: '0 8px 20px rgba(113,75,103,.35)',
            }}
          >
            ✈️
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '6px' }}>
            TravelLoop
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Sign in to continue your adventure
          </p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="login-email"
              style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-bg-alt)',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--color-bg-alt)'}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '28px' }}>
            <label
              htmlFor="login-password"
              style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-bg-alt)',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--color-bg-alt)'}
            />
          </div>

          <button id="login-submit-btn" type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Sign In →
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '20px' }}>
          Don't have an account?{' '}
          <span style={{ color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' }}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
