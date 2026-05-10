import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* Fulfilling Feature 7: Meta info like Country, Cost, and Popularity */
const INR = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

const CITIES = [
  { id: 'c1', name: 'Goa', country: 'India', costIndex: '₹₹₹', popularity: '⭐ 4.9', emoji: '🏖️', region: 'West' },
  { id: 'c2', name: 'Jaipur', country: 'India', costIndex: '₹₹', popularity: '⭐ 4.8', emoji: '🏰', region: 'North' },
  { id: 'c3', name: 'Varanasi', country: 'India', costIndex: '₹', popularity: '⭐ 4.7', emoji: '🕉️', region: 'North' },
  { id: 'c4', name: 'Kerala', country: 'India', costIndex: '₹₹₹', popularity: '⭐ 4.9', emoji: '🌴', region: 'South' },
  { id: 'c5', name: 'Lucknow', country: 'India', costIndex: '₹₹', popularity: '⭐ 4.8', emoji: '🕌', region: 'North' },
  { id: 'c6', name: 'Mumbai', country: 'India', costIndex: '₹₹₹', popularity: '⭐ 4.9', emoji: '🌊', region: 'West' },
];

/* Fulfilling Feature 8: Activities categorized by interest or cost */
const ACTIVITIES = {
  Goa: [
    { id: 'a1', category: 'Adventure', name: 'Parasailing at Baga', cost: 1200, duration: '1h' },
    { id: 'a2', category: 'Food', name: 'Seafood at Britto\'s', cost: 1500, duration: '2h' },
    { id: 'a3', category: 'Sightseeing', name: 'Old Goa Church Tour', cost: 400, duration: '3h' },
  ],
  Lucknow: [
    { id: 'a4', category: 'Sightseeing', name: 'Bara Imambara Maze', cost: 300, duration: '2h' },
    { id: 'a5', category: 'Food', name: 'Tunday Kababi Dinner', cost: 800, duration: '1h' },
    { id: 'a6', category: 'Culture', name: 'Chikankari Workshop', cost: 1200, duration: '3h' },
  ]
};

export default function CitySearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [filter, setFilter] = useState('All');

  const filteredCities = CITIES.filter(c => {
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase());
    const matchesRegion = filter === 'All' || c.region === filter;
    return matchesQuery && matchesRegion;
  });

  return (
    <section style={{ fontFamily: 'Poppins, sans-serif' }}>
      <header className="page-header" style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="page-header__title" style={{ fontSize: '1.8rem', fontWeight: 700 }}>Discover Destinations 🌍</h1>
            <p className="page-header__subtitle" style={{ color: 'var(--color-text-muted)' }}>Search and discover activities to enrich your trips.</p>
          </div>
          <button className="btn-secondary" onClick={() => navigate(-1)}>← Back to Trip</button>
        </div>
      </header>

      {/* Feature 7: Search and Filter by Region */}
      <div className="card" style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city like Lucknow or Mumbai..."
            style={{ width: '100%', padding: '14px 14px 14px 45px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '1rem', outline: 'none' }}
          />
        </div>
        <select 
          style={{ padding: '14px', borderRadius: '12px', border: '1.5px solid #eee', background: '#fff', cursor: 'pointer' }}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Regions</option>
          <option value="North">North India</option>
          <option value="South">South India</option>
          <option value="West">West India</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredCities.length > 0 ? (
          filteredCities.map(city => (
            <div key={city.id} className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ fontSize: '3rem' }}>{city.emoji}</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#999', textTransform: 'uppercase' }}>Cost Index</div>
                  <div style={{ fontWeight: 700, color: '#714B67', fontSize: '1.2rem' }}>{city.costIndex}</div>
                </div>
              </div>
              
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>{city.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
                📍 {city.country} &nbsp;·&nbsp; {city.popularity}
              </p>
              
              {/* Feature 8: Activity Discovery */}
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '12px', background: selectedCity === city.name ? '#f8f9fa' : '#714B67', color: selectedCity === city.name ? '#714B67' : '#fff', border: selectedCity === city.name ? '1px solid #714B67' : 'none' }}
                onClick={() => setSelectedCity(selectedCity === city.name ? null : city.name)}
              >
                {selectedCity === city.name ? 'Close Activities' : 'See Things to Do'}
              </button>

              {selectedCity === city.name && (
                <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                  {(ACTIVITIES[city.name] || [
                    { id: 'gen1', category: 'Sightseeing', name: `${city.name} Walking Tour`, cost: 500, duration: '2h' },
                    { id: 'gen2', category: 'Food', name: 'Local Flavors Walk', cost: 400, duration: '1h' }
                  ]).map(act => (
                    <div key={act.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #fafafa' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#714B67', textTransform: 'uppercase' }}>{act.category}</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{act.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{INR(act.cost)} • {act.duration}</div>
                      </div>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '6px' }}
                        onClick={() => navigate('/itinerary-builder', { state: { addedActivity: act, city: city.name } })}
                      >
                        Add to Trip
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: '16px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔭</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>No results for "{query}"</h3>
            <p style={{ color: '#888' }}>Try searching for a region like "South" or "North".</p>
          </div>
        )}
      </div>
    </section>
  );
}