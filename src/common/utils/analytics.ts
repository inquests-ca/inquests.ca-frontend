import mixpanel from 'mixpanel-browser';

import { SearchType } from 'common/types';
import { AuthorityQuery, InquestQuery } from 'search/utils/api';

export const initializeAnalytics = () => {
  if (process.env.ENABLE_ANALYTICS === 'true') {
    mixpanel.init('3b7e098654dd98402efe90a1c16ecda5');
  }
};

