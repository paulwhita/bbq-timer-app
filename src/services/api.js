// src/services/api.js
export const API_BASE = 'http://104.236.223.226:3000';

export async function fetchTimers() {
  const res = await fetch(`${API_BASE}/api/timers`);
  if (!res.ok) throw new Error('Failed to load timers');
  return res.json();
}

export async function createTimer({ name, duration }) {
  const res = await fetch(`${API_BASE}/api/timers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, duration }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create timer');
  }
  return res.json();
}
// Fetch all alarms
export async function fetchAlarms() {
  const res = await fetch(`${API_BASE}/api/alarms`);
  if (!res.ok) throw new Error('Failed to load alarms');
  return res.json();
}

// Create a new alarm
export async function createAlarm({ name, trigger_time }) {
  const res = await fetch(`${API_BASE}/api/alarms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, trigger_time }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create alarm');
  }
  return res.json();
}
