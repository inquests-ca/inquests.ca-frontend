import { isUserSignedIn, getBearerToken } from '../firebase';

const defaultOptions = {
  credentials: 'omit'
};

export const fetchNoAuth = (url, options = {}) =>
  fetch(url, { ...defaultOptions, ...options });

export const fetchWithAuth = async (url, options = {}) => {
  if (!isUserSignedIn())
    throw new Error('No user is signed in, cannot authenticate request.');

  const token = await getBearerToken();
  return await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`
    }
  });
};
