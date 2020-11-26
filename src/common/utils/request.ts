import qs from 'qs';

const API_URL = process.env.REACT_APP_API_URL;

export const stringifyQuery = (query: any, options: qs.IStringifyOptions = {}) =>
  qs.stringify(query, {
    // Ignore falsey values other than 0.
    filter: (_prefix, value) => (typeof value === 'number' ? value : value ? value : undefined),
    addQueryPrefix: true,
    arrayFormat: 'brackets',
    ...options,
  });

export const parseQuery = (query: string, options: qs.IParseOptions = {}) =>
  qs.parse(query, { ignoreQueryPrefix: true, ...options });

// TODO: define type for options.
export const fetchJson = async <T>(path: string, query?: any, options?: any): Promise<T> => {
  const res = await fetch(API_URL + path + stringifyQuery(query), options);
  if (!res.ok) throw Error(res.statusText);

  try {
    const json = await res.json();
    return json as T;
  } catch (e) {
    throw Error('Unable to parse response into JSON.');
  }
};
