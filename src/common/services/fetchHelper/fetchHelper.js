const defaultOptions = {
  credentials: 'omit'
};

export const fetchNoAuth = (url, options = {}) =>
  fetch(window._config.api.invokeUrl + url, { ...defaultOptions, ...options });

export const fetchWithAuth = async (user, url, options = {}) => {
  const { token } = user;
  return await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`
    }
  });
};
