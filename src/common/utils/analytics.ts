import mixpanel from 'mixpanel-browser';

import { SearchType } from 'common/types';
import { AuthorityQuery, InquestQuery } from 'search/utils/api';

export const initializeAnalytics = () => {
  if (process.env.REACT_APP_ENABLE_ANALYTICS === 'true') {
    mixpanel.init('3b7e098654dd98402efe90a1c16ecda5');
  }
};

const analyticsReporter = <T extends Record<string, any>>(name: string) => {
  return (args: T) => {
    if (process.env.REACT_APP_DEBUG_ANALYTICS === 'true') {
      console.debug(`Event reported: ${name}\nParameters: ${JSON.stringify(args, null, 2)}`);
    }
    if (process.env.REACT_APP_ENABLE_ANALYTICS === 'true') {
      mixpanel.track(name, args);
    }
  };
};

type Query = { type: SearchType } & (AuthorityQuery | InquestQuery);

/**
 * Reports authority or inquest search performed by user.
 */
export const reportSearch = analyticsReporter<Query & { location: 'Home' | 'Search' }>('Search');

/**
 * Reports click on search result.
 */
export const reportSearchResultClick = analyticsReporter<Query & { id: number }>(
  'Search Result Click'
);

/**
 * Reports click on internal link (e.g., authority citation).
 *
 * @param category Type of internal link (e.g., "Citation", "Cited By")
 */
export const reportInternalLinkClick = analyticsReporter<{
  type: SearchType;
  category: string;
  id: number;
}>('Internal Link Click');

export interface NavigationEvent {
  location: 'Home' | 'Terms of Use' | 'Help';
}

/**
 * Reports website navigation via header links.
 */
export const reportNavigation = analyticsReporter<NavigationEvent>('Navigation');
