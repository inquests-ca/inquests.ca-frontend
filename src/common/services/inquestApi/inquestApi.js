import { fetchNoAuth } from '../fetchHelper';

// TODO: is this good practice?
// TODO: move to common file.
// TODO: helper method for calling API, extracting JSON?
const response = (data, error) => ({ data, error });

export const buildInquestQuery = keywords => ({ keywords });

export const getInquests = async query => {
  const queryParams =
    query.keywords && query.keywords.length
      ? '?' + query.keywords.map(keyword => `keyword[]=${keyword}`).join('&')
      : '';
  const url = `/inquests${queryParams}`;

  let res;
  try {
    res = await fetchNoAuth(url);
    if (!res.ok) return response(null, 'Failed to fetch inquests.');
  } catch (e) {
    return response(null, 'Failed to fetch inquests.');
  }

  let inquests;
  try {
    inquests = await res.json();
  } catch (e) {
    return response(null, 'Invalid response from server.');
  }

  return response(inquests, null);
};

export const getInquestKeywords = async () => {
  let res;
  try {
    res = await fetchNoAuth('/inquestKeywords');
    if (!res.ok) return response(null, 'Failed to fetch inquest keywords.');
  } catch (e) {
    return response(null, 'Failed to fetch inquest keywords.');
  }

  let keywords;
  try {
    keywords = await res.json();
  } catch (e) {
    return response(null, 'Invalid response from server.');
  }

  return response(keywords, null);
};
