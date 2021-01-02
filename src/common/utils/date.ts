/**
 * Parses year from date string.
 */
export const getYear = (date: string): string => date.slice(0, 4);

// Returns date string with format: YYYY-MM-DD.
export const getIsoDateString = (date: string): string => new Date(date).toISOString().slice(0, 10);

// Returns date string with format: Feb 10, 2010.
export const getDateString = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
