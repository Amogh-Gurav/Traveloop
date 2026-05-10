import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrips } from '../utils/tripsStore';

/* ── helpers ─────────────────────────────────────────────────── */
const INR = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

function tripDateRange(start, end) {
  if (!start || !end) return '—';
  const fmt = (s) => new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return `${fmt(start)} – ${fmt(end)}`;
}

function tripDays(start, end) {
  if (!start || !end) return 0;
  return Math.max(1, Math.round((new Date(end) - new Date(start)) / 86400000) + 1);
}

function totalBudgetUsed(trips) {
  return trips.reduce((s, t) => s + (Number(t.budget) || 0), 0);
}

/* ── static stats (non-trip ones) ───────────────────────────── */
const STATIC_STATS = [
  { icon: '🌍', label: 'Total Countries', value: '12', meta: 'On 3 continents',   badge: { text: '▲ 2 this year', type: 'success' } },
  { icon: '📅', label: 'Days Planned',    value: '64', meta: 'Across all trips',  badge: { text: '▲ 8 added',     type: 'success' } },
];

/* ── destination emoji map ───────────────────────────────────── */
function destEmoji(destination = '') {
  const d = destination.toLowerCase();
  if (/lucknow|varanasi|agra|delhi|india|jaipur|mumbai|goa|kerala/.test(d)) return '🇮🇳';
  if (/paris|france/.test(d))   return '🇫🇷';
  if (/tokyo|japan/.test(d))    return '🇯🇵';
  if (/bali|indonesia/.test(d)) return '🇮🇩';
  if (/london|uk/.test(d))      return '🇬🇧';
  if (/dubai|uae/.test(d))      return '🇦🇪';
  return '🌍';
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const navigate = useNavigate();

  /* Read live trips from localStorage */
  const [trips, setTrips] = useState([]);
  useEffect(() => { setTrips(getTrips()); }, []);

  const upcomingCount  = trips.length;
  const totalBudget    = totalBudgetUsed(trips);
  const totalDaysCount = trips.reduce((s, t) => s + tripDays(t.startDate, t.endDate), 0);
  const recentTrip     = trips[0] ?? null;   // most recently created

  /* Dynamic stats */
  const STATS = [
    {
      icon: '✈️',
      label: 'Upcoming Trips',
      value: String(upcomingCount || 0),
      meta: upcomingCount > 0 ? `${upcomingCount} trip${upcomingCount > 1 ? 's' : ''} planned` : 'No trips yet',
      badge: upcomingCount > 0
        ? { text: `▲ ${upcomingCount} planned`, type: 'success' }
        : { text: '+ Plan one now',             type: 'warning' },
    },
    ...STATIC_STATS,
    {
      icon: '💰',
      label: 'Total Budget',
      value: totalBudget > 0 ? INR(totalBudget) : '₹0',
      meta: 'Combined trip budgets',
      badge: { text: '₹ INR', type: 'success' },
    },
  ];

  return (
    <section>
      {/* Page Header */}
      <header className="page-header">
        <div>
          <h1 className="page-header__title">Welcome back, Traveler 👋</h1>
          <p className="page-header__subtitle">
            {trips.length > 0
              ? `You have ${trips.length} trip${trips.length > 1 ? 's' : ''} planned. Ready to explore?`
              : "Start your journey — plan your first trip today!"}
          </p>
        </div>
        <button
          id="plan-new-trip-btn"
          className="btn-primary"
          onClick={() => navigate('/trip/new')}
        >
          ＋ Plan New Trip
        </button>
      </header>

      {/* Stats Grid */}
      <div className="stats-grid">
        {STATS.map((stat) => (
          <article key={stat.label} className="card card--clickable">
            <div className="card__header">
              <div>
                <p className="card__title">{stat.label}</p>
                <p className="card__value" style={{ fontSize: stat.value.length > 8 ? '1.3rem' : '2rem' }}>
                  {stat.value}
                </p>
                <p className="card__meta">{stat.meta}</p>
              </div>
              <div className="card__icon" aria-hidden="true">{stat.icon}</div>
            </div>
            <span className={`card__badge card__badge--${stat.badge.type}`}>
              {stat.badge.text}
            </span>
          </article>
        ))}
      </div>

      {/* Recent Trips Section */}
      <div>
        <h2 className="section-title">Recent Trips</h2>

        {recentTrip ? (
          /* ── Dynamic trip card from localStorage ── */
          <div className="trip-card">
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: '6px' }}>
                    {destEmoji(recentTrip.destination)} Next Adventure
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
                    {recentTrip.name}
                  </h3>
                  <p style={{ opacity: 0.8, fontSize: '0.9rem', marginTop: '4px' }}>
                    📍 {recentTrip.destination}
                  </p>
                  <p style={{ opacity: 0.75, fontSize: '0.85rem', marginTop: '2px' }}>
                    📅 {tripDateRange(recentTrip.startDate, recentTrip.endDate)}
                  </p>
                </div>

                <span style={{ background: 'rgba(16,185,129,.2)', color: '#6EE7B7', fontWeight: 700, fontSize: '0.78rem', padding: '6px 14px', borderRadius: '9999px', letterSpacing: '0.04em' }}>
                  ● {recentTrip.status || 'Upcoming'}
                </span>
              </div>

              {/* Bottom meta */}
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                {[
                  { icon: '💳', label: `Budget: ${INR(recentTrip.budget)}` },
                  { icon: '📅', label: `${tripDays(recentTrip.startDate, recentTrip.endDate)} days` },
                  recentTrip.tripType && { icon: '🎒', label: recentTrip.tripType },
                ].filter(Boolean).map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', opacity: 0.85 }}>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}

                <button
                  className="btn-primary"
                  style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)', boxShadow: 'none', fontSize: '0.82rem', padding: '8px 18px' }}
                  onClick={() => navigate('/itinerary/1', { state: { trip: recentTrip } })}
                >
                  Open Itinerary →
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ── Empty state ── */
          <div className="card" style={{ textAlign: 'center', padding: '64px 40px' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🗺️</div>
            <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>No trips yet!</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
              Create your first trip and the AI will suggest the best spots for your destination.
            </p>
            <button className="btn-primary" onClick={() => navigate('/trip/new')}>
              ＋ Plan My First Trip
            </button>
          </div>
        )}

        {/* More trips list (if >1) */}
        {trips.length > 1 && (
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {trips.slice(1).map((t) => (
              <div
                key={t.id}
                className="card card--flat"
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px', cursor: 'pointer' }}
                onClick={() => navigate('/itinerary/1', { state: { trip: t } })}
              >
                <span style={{ fontSize: '1.5rem' }}>{destEmoji(t.destination)}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    {t.destination} · {tripDateRange(t.startDate, t.endDate)}
                  </div>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.88rem' }}>
                  {INR(t.budget)}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>→</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: '32px' }}>
        <h2 className="section-title">Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { icon: '🔍', label: 'Search Cities',  path: '/city-search' },
            { icon: '🗺️', label: 'Plan Itinerary', path: '/trip/new'   },
            { icon: '✈️', label: 'My Trips',        path: '/trips'      },
            { icon: '⚙️', label: 'Settings',        path: '/profile'    },
          ].map((action) => (
            <button
              key={action.label}
              id={`quick-action-${action.label.toLowerCase().replace(/\s/g, '-')}`}
              className="card card--clickable"
              onClick={() => navigate(action.path)}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', border: 'none', width: '100%', textAlign: 'left' }}
            >
              <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
