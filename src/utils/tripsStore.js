/**
 * tripsStore.js
 * Lightweight localStorage-backed trips store.
 * Shared between CreateTrip (write) and Dashboard (read).
 */

const KEY = 'travelloop_trips';

export function getTrips() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveTrip(trip) {
  const trips = getTrips();
  const newTrip = {
    ...trip,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: 'Upcoming',
  };
  // Most recent first
  localStorage.setItem(KEY, JSON.stringify([newTrip, ...trips]));
  return newTrip;
}

export function clearTrips() {
  localStorage.removeItem(KEY);
}
