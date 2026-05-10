import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/',             icon: '🏠', label: 'Dashboard'   },
  { to: '/trips',        icon: '✈️', label: 'My Trips'     },
  { to: '/city-search',  icon: '🔍', label: 'City Search'  },
  { to: '/profile',      icon: '👤', label: 'Profile'      },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar__brand">
        <div className="sidebar__brand-icon">✈️</div>
        <span className="sidebar__brand-name">TravelLoop</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav" aria-label="Main navigation">
        <span className="sidebar__nav-label">Menu</span>

        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `sidebar__nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon" aria-hidden="true">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        <div className="sidebar__nav-item" onClick={() => navigate('/login')} role="button">
          <span className="nav-icon">🚪</span>
          Logout
        </div>
      </div>
    </aside>
  );
}
