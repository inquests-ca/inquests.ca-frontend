import _ from 'lodash';

const API_URL = process.env.REACT_APP_API_URL;

type QueryData = Record<string, string | number | (string | number)[]>;

const getQueryString = (queryData: QueryData): string => {
  // Generate list of query parameter strings from object (e.g., { a: 1, b: 2 } -> ['a=1', 'b=2']).
  const queryStrings = _.map(queryData, (value, key) => {
    // Arrays are passed in query parameters as follows: key[]=value1&key[]=value2
    if (Array.isArray(value) && value.length)
      return value.map((item) => `${key}[]=${item}`).join('&');
    else if (
      (typeof value === 'string' && value) ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    )
      return `${key}=${value}`;
    else return '';
  });

  // Filter out empty strings and join into single string.
  const queryString = _.filter(queryStrings, (q) => q).join('&');

  if (queryString) return `?${queryString}`;
  else return '';
};

// TODO: define type for options.
export const fetchJson = async <T>(
  url: string,
  queryData?: QueryData,
  options?: any
): Promise<T> => {
  const queryString = queryData ? getQueryString(queryData) : '';

  const res = await fetch(API_URL + url + queryString, options);
  if (!res.ok) throw Error(res.statusText);

  try {
    const json = await res.json();
    return json as T;
  } catch (e) {
    throw Error('Unable to parse response into JSON.');
  }
};
