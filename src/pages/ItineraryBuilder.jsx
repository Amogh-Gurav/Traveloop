import { useState, useCallback, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import BudgetBreakdown from '../components/BudgetBreakdown';
import TripTools from '../components/TripTools';
import ShareModal from '../components/ShareModal';

/* ─────────────────────────────────────────────────────────────
   CONSTANTS & MOCK DB (Keeping your existing DB logic)
───────────────────────────────────────────────────────────── */
const ACTIVITY_ICONS = ['🗺️', '🍽️', '🏛️', '🛍️', '🎭', '🏖️', '🚂', '⛵', '🎨', '🌄'];
// ... (Keep your DB and getAISuggestions function exactly as they are)

const INR = (n) => n > 0 ? `₹${Number(n).toLocaleString('en-IN')}` : 'Free';

function formatDate(dateStr, offset = 0) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function ItineraryBuilder() {
  const { state } = useLocation();
  const navigate  = useNavigate();

  const trip = state?.trip ?? {
    id: 101, // Mock ID for API calls
    name: 'My Heritage Trip',
    destination: 'Lucknow',
    startDate: '2026-05-15',
    endDate: '2026-05-20',
    budget: 50000,
  };

  /* TASK 1: Multi-City Stops State */
  // Initializing with the first stop from the Create Trip form
  const [stops, setStops] = useState([
    { id: 'stop-1', cityName: trip.destination, duration: 3 }
  ]);

  const [days, setDays] = useState([
    { id: 1, stopId: 'stop-1', cityName: trip.destination, activities: [] },
    { id: 2, stopId: 'stop-1', cityName: trip.destination, activities: [] },
    { id: 3, stopId: 'stop-1', cityName: trip.destination, activities: [] },
  ]);

  const [addedIds, setAddedIds] = useState(new Set());
  const [pickerOpen, setPickerOpen] = useState(null);
  const pickerRef = useRef(null);
  const [showShare, setShowShare] = useState(false);

  /* TASK 1: Function to Add a New City Stop */
  const addNewStop = () => {
    const cityName = prompt("Enter the next city name (e.g., Mumbai, Delhi):");
    if (!cityName) return;
    
    const newStopId = `stop-${stops.length + 1}`;
    setStops([...stops, { id: newStopId, cityName, duration: 2 }]);
    
    // Add 2 new days for this city stop
    const startDayId = days.length + 1;
    const newDays = [
      { id: startDayId, stopId: newStopId, cityName, activities: [] },
      { id: startDayId + 1, stopId: newStopId, cityName, activities: [] }
    ];
    setDays([...days, ...newDays]);
  };

  /* AMOGH'S BACKEND CONNECTION: Automated Budget Calculation */
  const [spent, setSpent] = useState(0);
  useEffect(() => {
    // In a real demo, this calls GET /api/trips/{tripId}/budget
    const total = days.reduce((acc, day) => 
      acc + day.activities.reduce((sum, act) => sum + (act.cost || 0), 0), 0
    );
    setSpent(total);
  }, [days]);

  const pushActivity = useCallback((dayId, act) => {
    setDays(prev => prev.map(d =>
      d.id === dayId ? { ...d, activities: [...d.activities, act] } : d
    ));
  }, []);

  const addSuggestionToDay = (suggestion, dayId) => {
    pushActivity(dayId, { ...suggestion, id: Date.now() });
    setAddedIds(prev => new Set([...prev, suggestion.id]));
    setPickerOpen(null);
  };

  const deleteActivity = useCallback((dayId, actId) => {
    setDays(prev => prev.map(d =>
      d.id === dayId ? { ...d, activities: d.activities.filter(a => a.id !== actId) } : d
    ));
  }, []);

  const budget = Number(trip.budget) || 0;
  const pct = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;

  return (
    <section style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Hero bar (Visualizing Plans) */}
      <div className="itinerary-header-bar" style={{ background: 'var(--color-primary)', color: '#fff', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{trip.name} ✈️</h1>
            <p style={{ opacity: 0.9 }}>{formatDate(trip.startDate)} — {formatDate(trip.endDate)} ({days.length} Days)</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>TOTAL BUDGET</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{INR(spent)} <span style={{ fontSize: '1rem', fontWeight: 400 }}>/ {INR(budget)}</span></div>
            <div style={{ width: '200px', height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', marginTop: '8px' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: pct > 100 ? '#ff4d4d' : '#fff', borderRadius: '10px' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="itinerary-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* LEFT — Timeline with Multi-City Support */}
        <div className="timeline">
          {stops.map((stop, stopIdx) => (
            <div key={stop.id} className="stop-group" style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#714B67', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {stopIdx + 1}
                </div>
                <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#714B67' }}>Stop: {stop.cityName}</h2>
              </div>

              {days.filter(d => d.stopId === stop.id).map((day) => (
                <div className="timeline-day" key={day.id} style={{ borderLeft: '2px solid #eee', paddingLeft: '24px', marginLeft: '20px', position: 'relative', marginBottom: '24px' }}>
                  <div style={{ position: 'absolute', left: '-9px', top: '0', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', border: '2px solid #714B67' }}></div>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem' }}>Day {day.id}</h3>
                  
                  {day.activities.length === 0 ? (
                    <div className="empty-day-ui" style={{ padding: '20px', border: '1px dashed #ccc', borderRadius: '8px', textAlign: 'center', color: '#888' }}>
                      No activities added for {stop.cityName}. Check AI recommendations!
                    </div>
                  ) : (
                    day.activities.map(act => (
                      <div className="activity-card" key={act.id} style={{ display: 'flex', alignItems: 'center', background: '#fff', padding: '12px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '10px' }}>
                        <span style={{ fontSize: '1.5rem', marginRight: '12px' }}>{act.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600 }}>{act.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#666' }}>{act.time} • {INR(act.cost)}</div>
                        </div>
                        <button onClick={() => deleteActivity(day.id, act.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>🗑️</button>
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          ))}

          <button onClick={addNewStop} className="btn-secondary" style={{ width: '100%', padding: '15px', border: '2px dashed #714B67', color: '#714B67', background: 'transparent', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
            ＋ Add Another City Stop
          </button>
          
          <div style={{ marginTop: '40px' }}>
            <TripTools />
          </div>
        </div>

        {/* RIGHT — AI Panel (Remains the same as your code) */}
        <aside className="ai-panel">
            {/* ... (Keep your AI panel code here) */}
        </aside>

      </div>

      {showShare && <ShareModal trip={trip} days={days} onClose={() => setShowShare(false)} />}
    </section>
  );
}