// Returns date string with format: YYYY-MM-DD.
export const toIsoDateString = dateString => new Date(dateString).toISOString().slice(0, 10);

// Returns date string with format: Feb 10, 2010.
export const toReadableDateString = dateString =>
  new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
