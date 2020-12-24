import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Authority, Inquest } from 'common/models';
import { reportInternalLinkClick } from 'common/utils/analytics';
import { SearchType } from 'common/types';

const useStyles = makeStyles((theme) => ({
  // Overrides default anchor styling from anchor elements.
  internalLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

interface AuthorityInternalLinksProps {
  authorities: Authority[];
  category: string;
}

export const AuthorityInternalLinks = ({ authorities, category }: AuthorityInternalLinksProps) => {
  const classes = useStyles();

  if (!authorities.length) return null;

  return (
    <>
      {authorities.map((authority, i) => (
        <Link
          className={classes.internalLink}
          key={i}
          to={`/authority/${authority.authorityId}`}
          onClick={() =>
            reportInternalLinkClick({
              type: SearchType.Authority,
              id: authority.authorityId!,
              category,
            })
          }
        >
          {authority.name}
          <br />
        </Link>
      ))}
    </>
  );
};

interface InquestInternalLinksProps {
  inquests: Inquest[];
  category: string;
}

export const InquestInternalLinks = ({ inquests, category }: InquestInternalLinksProps) => {
  const classes = useStyles();

  if (!inquests.length) return null;

  return (
    <>
      {inquests.map((inquest, i) => (
        <Link
          className={classes.internalLink}
          key={i}
          to={`/inquest/${inquest.inquestId}`}
          onClick={() =>
            reportInternalLinkClick({
              type: SearchType.Inquest,
              id: inquest.inquestId!,
              category,
            })
          }
        >
          {inquest.name}
          <br />
        </Link>
      ))}
    </>
  );
};
