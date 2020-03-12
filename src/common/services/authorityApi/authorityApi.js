import { fetchNoAuth, fetchWithAuth } from '../fetchHelper';

// TODO: is this good practice?
// TODO: move to common file.
// TODO: helper method for calling API, extracting JSON?
const response = (data, error) => ({ data, error });

export const buildAuthorityQuery = keywords => ({ keywords });

export const getAuthorities = async query => {
  const queryParams =
    query.keywords && query.keywords.length
      ? '?' + query.keywords.map(keyword => `keyword[]=${keyword}`).join('&')
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

export const getAuthorityKeywords = async () => {
  let res;
  try {
    res = await fetchNoAuth('/authorityKeywords');
    if (!res.ok) return response(null, 'Failed to fetch authority keywords.');
  } catch (e) {
    return response(null, 'Failed to fetch authority keywords.');
  }

  let keywords;
  try {
    keywords = await res.json();
  } catch (e) {
    return response(null, 'Invalid response from server.');
  }

  return response(keywords, null);
};

export const createAuthority = async (user, authority) => {
  let res;
  try {
    res = await fetchWithAuth(user, '/authorities', {
      method: 'POST',
      headers: {
        ContentType: 'application/json'
      },
      body: JSON.stringify(authority)
    });
    if (!res.ok) return response(null, 'Failed to create authority.');
  } catch (e) {
    return response(null, 'Failed to create authority.');
  }

  let createdAuthority;
  try {
    createdAuthority = await res.json();
  } catch (e) {
    return response(null, 'Invalid response from server.');
  }

  return response(createdAuthority, null);
};
