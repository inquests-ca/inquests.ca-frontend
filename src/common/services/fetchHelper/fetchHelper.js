const defaultOptions = {
  credentials: 'omit'
};

export const fetchNoAuth = (url, options = {}) => fetch(url, { ...defaultOptions, ...options });
