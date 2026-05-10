import { useState, useRef } from 'react';

export default function Profile() {
  const [preferences, setPreferences] = useState({
    solo: true,
    foodie: true,
    budget: false,
    adventure: true
  });

  // Feature 12: State for Saved Destinations 
  const [savedDestinations, setSavedDestinations] = useState(['Goa, India', 'Paris, France', 'Bali, Indonesia']);
  
  const fileInputRef = useRef(null);

  const togglePref = (key) => setPreferences(p => ({ ...p, [key]: !p[key] }));
  
  // Feature 12: Handle Photo Selection 
  const handlePhotoClick = () => fileInputRef.current.click();

  // Feature 12: Remove Destination Logic 
  const removeDestination = (dest) => {
    setSavedDestinations(prev => prev.filter(item => item !== dest));
  };

  return (
    <section style={{ fontFamily: 'Poppins, sans-serif', paddingBottom: '40px' }}>
      <header className="page-header" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-header__title" style={{ fontSize: '1.8rem', fontWeight: 700 }}>User Profile / Settings 👤</h1>
          <p className="page-header__subtitle" style={{ color: 'var(--color-text-muted)' }}>Update your profile information and preferences[cite: 88].</p>
        </div>
        <button className="btn-primary" style={{ padding: '10px 24px' }}>Save Changes</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 2fr)', gap: '24px', alignItems: 'flex-start' }}>
        
        {/* Left Column: Avatar & Quick Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 24px' }}>
            <div style={{ position: 'relative', marginBottom: '16px', cursor: 'pointer' }} onClick={handlePhotoClick}>
              <div style={{
                width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #714B67, #a06b91)', 
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: '700',
                boxShadow: '0 8px 24px rgba(113,75,103,0.2)'
              }}>
                KP
              </div>
              {/* Feature 12: Photo Upload Component  */}
              <button style={{ position: 'absolute', bottom: '0', right: '0', width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-white)', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                📷
              </button>
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '4px' }}>Kanika Patil</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>kanika.p@travelloop.app</p>
            <span style={{ fontSize: '0.75rem', background: 'rgba(113,75,103,0.1)', color: '#714B67', padding: '4px 12px', borderRadius: '12px', fontWeight: '600' }}>Member Since 2024</span>
          </div>

          <div className="card">
            <h2 className="section-title" style={{ fontSize: '1rem', marginBottom: '16px' }}>Travel Stats</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#714B67' }}>14</div>
                <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: '600' }}>TRIPS</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#714B67' }}>₹3.2L</div>
                <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: '600' }}>SPENT</div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column: Editable Fields & Preferences */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="card">
            <h2 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Personal Information </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Full Name</label>
                <input type="text" className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} defaultValue="Kanika Patil" />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Email Address</label>
                <input type="email" className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} defaultValue="kanika.p@travelloop.app" />
              </div>
            </div>

            {/* Feature 12: Language Preference  */}
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Language Preference</label>
              <select className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', cursor: 'pointer' }} defaultValue="en">
                <option value="en">English (UK)</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>

          {/* Feature 12: Saved Destinations List  */}
          <div className="card">
            <h2 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Saved Destinations 📍</h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {savedDestinations.map(dest => (
                <div key={dest} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8f9fa', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', border: '1px solid #eee' }}>
                  {dest}
                  <button onClick={() => removeDestination(dest)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '1.1rem' }}>&times;</button>
                </div>
              ))}
              <button style={{ border: '1px dashed #714B67', color: '#714B67', background: 'transparent', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                + Add New
              </button>
            </div>
          </div>

          {/* Feature 12: Delete Account  */}
          <div className="card" style={{ border: '1px solid rgba(239, 68, 68, 0.2)', background: '#fff' }}>
            <h2 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#ef4444' }}>Danger Zone</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Delete Account</div>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>Permanently remove your data and trips[cite: 88].</div>
              </div>
              <button className="btn-secondary" style={{ padding: '8px 16px', color: '#ef4444', borderColor: '#fca5a5', background: '#fef2f2' }}>
                Delete Account
              </button>
            </div>
          </div>

        </div>
      </div>
      
      <footer style={{ marginTop: '40px', textAlign: 'center', color: '#aaa', fontSize: '0.8rem' }}>
        © 2026 Traveloop | Hackathon Project | Roll No: 26
      </footer>
    </section>
  );
}