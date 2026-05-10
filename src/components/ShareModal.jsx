import React, { useState } from 'react';

export default function ShareModal({ tripName = "Lucknow Heritage Tour", onClose }) {
  const [copyStatus, setCopyStatus] = useState('Copy');
  const [isCopyingEnabled, setIsCopyingEnabled] = useState(false);
  
  // Feature 11: Generating a public URL for shared viewing [cite: 80, 85]
  const mockUrl = `traveloop.app/share/${tripName.toLowerCase().replace(/\s+/g, '-')}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(mockUrl);
    setCopyStatus('Copied!');
    setTimeout(() => setCopyStatus('Copy'), 2000);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="card" style={{ 
        width: '90%', 
        maxWidth: '500px', 
        position: 'relative', 
        padding: '32px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.8rem', cursor: 'pointer', color: '#999' }}
        >
          &times;
        </button>
        
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px', color: '#714B67' }}>Share Your Trip 🌍</h2>
        <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '28px' }}>
          Let friends and the community discover your itinerary! [cite: 22, 81]
        </p>

        {/* Feature 11: Public Link with Copy Logic [cite: 85] */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#714B67', marginBottom: '10px', textTransform: 'uppercase' }}>
            Public Shareable Link
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              readOnly 
              value={mockUrl}
              style={{ flex: 1, padding: '12px 16px', background: '#f8f9fa', border: '1.5px solid #eee', borderRadius: '10px', color: '#555', fontSize: '0.95rem', outline: 'none' }}
            />
            <button 
              className="btn-primary" 
              onClick={handleCopyLink}
              style={{ padding: '0 20px', background: '#714B67', color: '#fff', borderRadius: '10px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
            >
              {copyStatus}
            </button>
          </div>
        </div>

        {/* Feature 11: Social Media Sharing [cite: 85] */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
            WhatsApp
          </button>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px', background: '#1DA1F2', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
            Twitter
          </button>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 -32px 32px -32px' }} />

        {/* Feature 11: Copy Trip Functionality [cite: 81, 85] */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#333' }}>Allow Others to Copy?</h3>
            <div 
              onClick={() => setIsCopyingEnabled(!isCopyingEnabled)}
              style={{ 
                width: '50px', height: '26px', background: isCopyingEnabled ? '#714B67' : '#ccc', 
                borderRadius: '13px', position: 'relative', cursor: 'pointer', transition: '0.3s' 
              }}
            >
              <div style={{ 
                width: '20px', height: '20px', background: '#fff', borderRadius: '50%', 
                position: 'absolute', top: '3px', left: isCopyingEnabled ? '27px' : '3px', transition: '0.3s' 
              }} />
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#777', lineHeight: '1.6', margin: 0 }}>
            If enabled, other travelers can click <strong>"Copy Trip"</strong> to add this itinerary to their personal dashboard. [cite: 81]
          </p>
          
          <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(113,75,103,0.06)', borderRadius: '12px', border: '1.5px dashed #714B67' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#714B67', fontWeight: 700, fontSize: '0.9rem' }}>
              <span>👁️</span> Read-Only Mode Active
            </div>
            <p style={{ fontSize: '0.82rem', color: '#714B67', marginTop: '6px', opacity: 0.85, lineHeight: '1.5' }}>
              External viewers see a clean timeline. All editing tools are hidden for shared links to protect your original plan. [cite: 85]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}