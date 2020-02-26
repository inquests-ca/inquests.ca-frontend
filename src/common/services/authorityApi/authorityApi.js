import { fetchNoAuth, fetchWithAuth } from '../fetchHelper';

// TODO: is this good practice?
// TODO: move to common file.
const response = (data, error) => ({ data, error });

export const getAuthorities = async keywords => {
  const queryParams = keywords.length
    ? '?' + keywords.map(keyword => `keyword[]=${keyword}`).join('&')
    : '';
  const url = `/authorities${queryParams}`;

  const res = await fetchNoAuth(url);

  if (!res.ok) return response(null, 'Failed to fetch authorities.');

  try {
    const authorities = await res.json();
    return response(authorities, null);
  } catch (e) {
    return response(null, 'Invalid response from server.');
  }
};

export const createAuthority = async (user, authority) => {
  const res = await fetchWithAuth(user, '/inquests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authority)
  });

  if (!res.ok) return response(null, 'Failed to create authority.');

  try {
    const authority = await response.json();
    return response(authority, null);
  } catch (e) {
    return response(null, 'Invalid response from server.');
  }
};
