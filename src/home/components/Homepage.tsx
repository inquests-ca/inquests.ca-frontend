import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import RadioButtons from 'common/components/RadioButtons';
import SearchField from 'common/components/SearchField';
import { SearchType, MenuItem } from 'common/types';
import { stringifyQuery } from 'common/utils/request';
import { AuthorityQuery, fetchAuthorities, defaultAuthorityQuery } from 'search/utils/api';

const useStyles = makeStyles((theme) => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(6),
  },
  title: { fontSize: '5rem' },
  subtitle: {
    marginBottom: theme.spacing(8),
  },
  searchField: {
    marginTop: theme.spacing(2),
    maxWidth: '550px',
  },
}));

const Homepage = () => {
  const history = useHistory();

  const [searchType, setSearchType] = useState<SearchType>(SearchType.Authority);

  // Send request to wake up Heroku instance.
  useQuery(['authorities', defaultAuthorityQuery()], (_key: string, query: AuthorityQuery) =>
    fetchAuthorities(query)
  );

  const handleSearchTypeChange = (newSearchType: string) =>
    setSearchType(newSearchType as SearchType);

  const handleSearch = (text: string) => {
    history.push(`/search${stringifyQuery({ type: searchType, text, page: 1 })}`);
  };

  const classes = useStyles();

  const searchOptions: MenuItem[] = [
    {
      value: 'authority',
      label: (
        <>
          <b>Authorities</b> &mdash; Inquest-related case law and other reference materials.
        </>
      ),
    },
    {
      value: 'inquest',
      label: (
        <>
          <b>Inquests</b> &mdash; Findings, recommendations, and other documents from inquests.
        </>
      ),
    },
  ];

  return (
    <div className={classes.layout}>
      <Typography className={classes.title} variant="h1" component="h1">
        Inquests.ca
      </Typography>
      <Typography className={classes.subtitle} variant="h6" component="h2">
        A searchable, public repository of Canadian inquests and the law and procedures governing
        them.
      </Typography>
      <RadioButtons
        items={searchOptions}
        selectedValue={searchType}
        onChange={handleSearchTypeChange}
      ></RadioButtons>
      <SearchField
        onSearch={handleSearch}
        label="Enter search terms"
        name="search"
        fullWidth
        className={classes.searchField}
      ></SearchField>
    </div>
  );
};

export default Homepage;
