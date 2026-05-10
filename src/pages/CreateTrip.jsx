import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveTrip } from '../utils/tripsStore';

const TRIP_TYPES = ['Adventure', 'Business', 'Family', 'Honeymoon', 'Solo', 'Group'];

export default function CreateTrip() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    tripType: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name        = 'Trip name is required.';
    if (!form.destination.trim()) e.destination = 'Destination is required.';
    if (!form.startDate)          e.startDate   = 'Start date is required.';
    if (!form.endDate)            e.endDate     = 'End date is required.';
    if (form.startDate && form.endDate && form.endDate < form.startDate)
      e.endDate = 'End date must be after start date.';
    if (!form.budget || Number(form.budget) <= 0)
      e.budget = 'Enter a valid budget.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsSubmitting(true);
    // Persist to localStorage so Dashboard shows it
    const saved = saveTrip(form);
    setTimeout(() => navigate('/itinerary/1', { state: { trip: saved } }), 600);
  };

  const inputProps = (field) => ({
    id: `create-trip-${field}`,
    value: form[field],
    onChange: (e) => { update(field, e.target.value); setErrors((prev) => ({ ...prev, [field]: '' })); },
    className: `form-input${errors[field] ? ' input-error' : ''}`,
  });

  return (
    <section>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: '8px', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
        <Link to="/" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Dashboard</Link>
        {' › '}
        <Link to="/trips" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>My Trips</Link>
        {' › New Trip'}
      </nav>

      {/* Page Header */}
      <header className="page-header">
        <div>
          <h1 className="page-header__title">Plan a New Trip ✈️</h1>
          <p className="page-header__subtitle">Fill in the details below and we'll set up your itinerary.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        {/* ── Main form card ── */}
        <form id="create-trip-form" className="card" onSubmit={handleSubmit} noValidate>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🗺️</span> Trip Details
          </h2>

          {/* Trip Name */}
          <div className="form-group">
            <label htmlFor="create-trip-name" className="form-label">
              Trip Name <span className="label-required">*</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon">✏️</span>
              <input
                {...inputProps('name')}
                type="text"
                placeholder="e.g. Summer in Paris"
                autoFocus
              />
            </div>
            {errors.name && <FieldError msg={errors.name} />}
          </div>

          {/* Destination */}
          <div className="form-group">
            <label htmlFor="create-trip-destination" className="form-label">
              Destination <span className="label-required">*</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon">📍</span>
              <input
                {...inputProps('destination')}
                type="text"
                placeholder="City, Country or Region"
              />
            </div>
            {errors.destination && <FieldError msg={errors.destination} />}
          </div>

          {/* Start & End Date side-by-side */}
          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="create-trip-startDate" className="form-label">
                Start Date <span className="label-required">*</span>
              </label>
              <input
                {...inputProps('startDate')}
                type="date"
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.startDate && <FieldError msg={errors.startDate} />}
            </div>

            <div className="form-group">
              <label htmlFor="create-trip-endDate" className="form-label">
                End Date <span className="label-required">*</span>
              </label>
              <input
                {...inputProps('endDate')}
                type="date"
                min={form.startDate || new Date().toISOString().split('T')[0]}
              />
              {errors.endDate && <FieldError msg={errors.endDate} />}
            </div>
          </div>

          <hr className="form-divider" />

          {/* Estimated Budget */}
          <div className="form-group">
            <label htmlFor="create-trip-budget" className="form-label">
              Estimated Budget <span className="label-required">*</span>
            </label>
            <div className="input-with-prefix">
              <span className="input-prefix">₹ INR</span>
              <input
                {...inputProps('budget')}
                type="number"
                placeholder="0.00"
                min="0"
                step="10"
              />
            </div>
            {errors.budget && <FieldError msg={errors.budget} />}
          </div>

          {/* Trip Type */}
          <div className="form-group">
            <label htmlFor="create-trip-tripType" className="form-label">Trip Type</label>
            <select
              id="create-trip-tripType"
              className="form-select"
              value={form.tripType}
              onChange={(e) => update('tripType', e.target.value)}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px' }}
            >
              <option value="">Select trip type…</option>
              {TRIP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="create-trip-description" className="form-label">Description</label>
            <textarea
              id="create-trip-description"
              className="form-textarea"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="What's the vibe of this trip? Any must-do activities?"
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/trips')}
            >
              Cancel
            </button>
            <button
              id="create-trip-submit-btn"
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              style={{ minWidth: '160px' }}
            >
              {isSubmitting ? '✈️ Creating…' : '✈️ Create Trip'}
            </button>
          </div>
        </form>

        {/* ── Sidebar hint card ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card card--flat">
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>💡 Tips</h3>
            {[
              ['✈️', 'Be specific with your destination for better suggestions.'],
              ['📅', 'Add buffer days to avoid a rushed itinerary.'],
              ['💰', 'Include accommodation and transport in the budget.'],
              ['🎒', 'You can always edit details from the Itinerary Builder.'],
            ].map(([icon, tip]) => (
              <div key={tip} style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                <span>{icon}</span><span>{tip}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ background: 'linear-gradient(135deg,var(--color-primary),#9b6d8f)', color: '#fff', border: 'none' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🌍</div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>12 countries explored</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Keep looping — your next adventure awaits!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldError({ msg }) {
  return (
    <p style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px', fontWeight: 500 }}>
      ⚠ {msg}
    </p>
  );
}
