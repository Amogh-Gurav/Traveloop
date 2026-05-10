import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MyTrips from './pages/MyTrips';
import CitySearch from './pages/CitySearch';
import Profile from './pages/Profile';
import Login from './pages/Login';
import CreateTrip from './pages/CreateTrip';
import ItineraryBuilder from './pages/ItineraryBuilder';
import './index.css';

/* Inner layout that can read the current route */
function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/"                element={<Dashboard />}        />
          <Route path="/trips"            element={<MyTrips />}          />
          <Route path="/city-search"      element={<CitySearch />}       />
          <Route path="/profile"          element={<Profile />}          />
          <Route path="/trip/new"         element={<CreateTrip />}       />
          <Route path="/itinerary/:id"    element={<ItineraryBuilder />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}