import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import RadioButtons from 'common/components/RadioButtons';
import SearchField from 'common/components/SearchField';
import { SearchType, MenuItem } from 'common/types';
import { stringifyQuery } from 'common/utils/request';

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
        <span>
          <b>Authorities</b> &mdash; inquest-related case law.
        </span>
      ),
    },
    {
      value: 'inquest',
      label: (
        <span>
          <b>Inquests</b> &mdash; inquests including their verdicts and verdict explanations.
        </span>
      ),
    },
  ];

  return (
    <div className={classes.layout}>
      <Typography className={classes.title} variant="h1" component="h1">
        Inquests.ca
      </Typography>
      <Typography className={classes.subtitle} variant="h6" component="h2">
        A repository of Canadian inquest-related rulings, findings, and other authorities.
      </Typography>
      <RadioButtons
        items={searchOptions}
        selectedValue={searchType}
        onChange={handleSearchTypeChange}
      ></RadioButtons>
      <SearchField
        onSearch={handleSearch}
        label="Search"
        name="search"
        fullWidth
        className={classes.searchField}
      ></SearchField>
    </div>
  );
};

export default Homepage;
