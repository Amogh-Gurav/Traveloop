import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrips } from '../utils/tripsStore';

const INR = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

function tripDateRange(start, end) {
  if (!start || !end) return '—';
  const fmt = (s) => new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return `${fmt(start)} – ${fmt(end)}`;
}

export default function MyTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  return (
    <section>
      <header className="page-header">
        <div>
          <h1 className="page-header__title">My Trips ✈️</h1>
          <p className="page-header__subtitle">All your planned adventures in one place.</p>
        </div>
        {trips.length > 0 && (
          <button className="btn-primary" onClick={() => navigate('/trip/new')}>
            ＋ New Trip
          </button>
        )}
      </header>

      {trips.length === 0 ? (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px', background: 'linear-gradient(to bottom right, var(--color-white), var(--color-primary-alpha))' }}>
          <div style={{ 
            width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-primary-alpha)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', marginBottom: '24px',
            boxShadow: '0 0 0 10px rgba(113, 75, 103, 0.05), 0 0 0 20px rgba(113, 75, 103, 0.02)'
          }}>
            🎒
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '12px' }}>
            Ready for your next journey?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px', textAlign: 'center', maxWidth: '400px', fontSize: '0.95rem' }}>
            You haven't planned any trips yet. Create your first adventure and let our AI suggest the best local experiences for you.
          </p>
          <button className="btn-primary" onClick={() => navigate('/trip/new')} style={{ padding: '12px 24px', fontSize: '1rem' }}>
            Start your first adventure
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {trips.map(trip => (
            <div key={trip.id} className="card card--clickable" onClick={() => navigate('/itinerary/1', { state: { trip } })}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{trip.name}</h3>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', padding: '4px 8px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#059669' }}>
                  {trip.status || 'Upcoming'}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                📍 {trip.destination}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                📅 {tripDateRange(trip.startDate, trip.endDate)}
              </p>
              <div style={{ borderTop: '1px solid var(--color-bg-alt)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{INR(trip.budget)}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>View Itinerary →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
