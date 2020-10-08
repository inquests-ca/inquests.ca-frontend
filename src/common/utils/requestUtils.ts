import _ from 'lodash';

const API_URL = process.env.REACT_APP_API_URL;

interface Response {
  data?: any;
  error?: string;
}

type QueryData = Record<string, string | number | (string | number)[]>;

const getQueryString = (queryData: QueryData): string => {
  // Generate list of query parameter strings from object (e.g., { a: 1, b: 2 } -> ['a=1', 'b=2']).
  const queryDataStrings = _.map(queryData, (value, key) => {
    // Arrays are passed in query parameters as follows (note double underscore): a=value1__value2
    // TODO: use another delimiter to separate array values.
    if (Array.isArray(value) && value.length) return `${key}=${value.join('__')}`;
    else if (value && typeof value == 'string') return `${key}=${value}`;
    else if (_.includes(['number', 'boolean'], typeof value)) return `${key}=${value}`;
    else return '';
  });

  // Filter out empty strings and join into single string.
  const queryDataString = _.filter(queryDataStrings, (q) => q).join('&');

  if (queryDataString) return `?${queryDataString}`;
  else return '';
};

export const fetchJson = async (
  url: string,
  queryData?: QueryData,
  options?: any
): Promise<Response> => {
  const queryString = queryData ? getQueryString(queryData) : '';

  let res;
  try {
    res = await fetch(API_URL + url + queryString, options);
    if (!res.ok) return { error: res.statusText };
  } catch (e) {
    return { error: 'Unknown network error occurred.' };
  }

  try {
    const json = await res.json();
    return { data: json };
  } catch (e) {
    return { error: 'Unable to parse response into JSON.' };
  }
};
