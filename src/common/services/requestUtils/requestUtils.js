import _ from 'lodash';

const API_URL = process.env.REACT_APP_API_URL;

const response = (data, error) => ({ data, error });

export const encodeQueryData = queryData => {
  // Generate list of query parameter strings from object (e.g., { a: 1, b: 2 } -> ['a=1', 'b=2']).
  const queryDataStrings = _.map(queryData, (value, key) => {
    // Arrays are passed in query parameters as follows (note double underscore): a=value1__value2
    // TODO: use another delimiter to separate array values.
    if (Array.isArray(value)) return `${key}=${value.join('__')}`;
    else if (value && typeof value == 'string') return `${key}=${value}`;
    else if (_.includes(['number', 'boolean'], typeof value)) return `${key}=${value}`;
    else return '';
  });

  // Filter out empty strings and join into single string.
  const queryDataString = _.filter(queryDataStrings, q => q).join('&');

  if (queryDataString) return '?' + queryDataString;
  else return '';
};

export const fetchJson = async (url, user = null, options = {}) => {
  // Add authorization header if a user is passed in.
  if (user) options.headers.Authorization = `Bearer ${user.token}`;

  let res;
  try {
    res = await fetch(API_URL + url, options);
    if (!res.ok) return response(null, res.statusText);
  } catch (e) {
    return response(null, 'Unknown network error occurred.');
  }

  try {
    const json = await res.json();
    return response(json, null);
  } catch (e) {
    return response(null, 'Invalid JSON response from server.');
  }
};
