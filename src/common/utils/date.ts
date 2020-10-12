// Returns date string with format: YYYY-MM-DD.
export const toIsoDateString = (date: string): string => new Date(date).toISOString().slice(0, 10);

// Returns date string with format: Feb 10, 2010.
export const toReadableDateString = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
