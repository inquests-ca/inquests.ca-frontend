import { fetchWithAuth } from '../fetchHelper';

const authorityResponse = (authority, error) => ({ authority, error });

export const createAuthority = async (user, authority) => {
  const response = await fetchWithAuth(user, '/api/inquests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authority)
  });

  if (!response.ok)
    return authorityResponse(null, 'Failed to create authority.');

  try {
    const authority = await response.json();
    return authorityResponse(authority, null);
  } catch (e) {
    return authorityResponse(null, 'Invalid response from server.');
  }
};
