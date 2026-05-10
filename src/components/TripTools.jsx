import { useState } from 'react';

export default function TripTools() {
  const [activeTab, setActiveTab] = useState('checklist');
  const [items, setItems] = useState([
    { id: 1, text: 'Passport & ID', category: 'Documents', packed: true },
    { id: 2, text: 'Flight Tickets', category: 'Documents', packed: false },
    { id: 3, text: 'Phone Charger', category: 'Electronics', packed: true },
    { id: 4, text: 'Power Bank', category: 'Electronics', packed: false },
    { id: 5, text: 'Comfortable Shoes', category: 'Clothing', packed: false },
    { id: 6, text: 'Jacket', category: 'Clothing', packed: false },
  ]);
  const [note, setNote] = useState('Flight lands at 10 AM. Hotel check-in is at 2 PM. Booking ref: XYZ123.');
  const [lastSaved, setLastSaved] = useState(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  };

  const saveNote = () => {
    setLastSaved(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-bg-alt)', marginBottom: '16px' }}>
        <button 
          onClick={() => setActiveTab('checklist')}
          style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: activeTab === 'checklist' ? '2px solid var(--color-primary)' : '2px solid transparent', color: activeTab === 'checklist' ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
        >
          ✅ Packing List
        </button>
        <button 
          onClick={() => setActiveTab('notes')}
          style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: activeTab === 'notes' ? '2px solid var(--color-primary)' : '2px solid transparent', color: activeTab === 'notes' ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
        >
          📝 Trip Notes
        </button>
      </div>

      {activeTab === 'checklist' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {['Documents', 'Electronics', 'Clothing'].map(category => (
            <div key={category}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>{category}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {items.filter(i => i.category === category).map(item => (
                  <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px', background: 'var(--color-bg)', borderRadius: '8px', transition: 'background 0.2s' }} className="checkbox-label">
                    <input type="checkbox" checked={item.packed} onChange={() => toggleItem(item.id)} style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px', cursor: 'pointer' }} />
                    <span style={{ fontSize: '0.9rem', color: item.packed ? 'var(--color-text-muted)' : 'var(--color-text-primary)', textDecoration: item.packed ? 'line-through' : 'none', transition: 'all 0.2s' }}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Jot down your flight number, hotel info, or reminders..."
            style={{ width: '100%', height: '180px', padding: '12px', borderRadius: '8px', border: '1.5px solid var(--color-bg-alt)', fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', resize: 'none', outline: 'none' }}
            onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--color-bg-alt)'}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Last saved: {lastSaved}
            </span>
            <button className="btn-primary" onClick={saveNote} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Save Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
