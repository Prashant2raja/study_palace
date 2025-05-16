
// e.g. src/services/api.js
const API = process.env.REACT_APP_API_BASE_URL;     // <- note the REACT_APP_ prefix
export function login({ email, password, role }) {
  return fetch(`${API}/api/login`, {
    method: 'POST',
    credentials: 'include',      // if you rely on cookies
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role })
  })
  .then(r => r.json());
}
