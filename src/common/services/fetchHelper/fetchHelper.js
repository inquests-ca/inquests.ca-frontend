// TODO: configure path variables to avoid the need for so many ..
import config from '../../../config.prod.js';

const defaultOptions = {
  credentials: 'omit'
};

export const fetchNoAuth = (url, options = {}) =>
  fetch(config.api.invokeUrl + url, { ...defaultOptions, ...options });
