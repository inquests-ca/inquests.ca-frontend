import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Authority, Inquest } from 'common/models';

const useStyles = makeStyles((theme) => ({
  // Overrides default anchor styling from anchor elements.
  internalLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
}));

interface AuthorityInternalLinksProps {
  authorities: Authority[];
}

export const AuthorityInternalLinks = ({ authorities }: AuthorityInternalLinksProps) => {
  const classes = useStyles();

  if (!authorities.length) return null;

  return (
    <>
      {authorities.map((authority, i) => (
        <Link className={classes.internalLink} key={i} to={`/authority/${authority.authorityId}`}>
          {authority.name}
          <br />
        </Link>
      ))}
    </>
  );
};

interface InquestInternalLinksProps {
  inquests: Inquest[];
}

export const InquestInternalLinks = ({ inquests }: InquestInternalLinksProps) => {
  const classes = useStyles();

  if (!inquests.length) return null;

  return (
    <>
      {inquests.map((inquest, i) => (
        <Link className={classes.internalLink} key={i} to={`/inquest/${inquest.inquestId}`}>
          {inquest.name}
          <br />
        </Link>
      ))}
    </>
  );
};
