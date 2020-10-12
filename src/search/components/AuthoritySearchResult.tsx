import React from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { toIsoDateString } from 'common/utils/date';
import { Authority, AuthorityDocument } from 'common/models';

const useStyles = makeStyles((theme) => ({
  layout: {
    textAlign: 'left',
    maxHeight: 200,
    marginTop: theme.spacing(2),
  },
  // Prevent default anchor styling.
  nav: {
    textDecoration: 'none',
    color: 'inherit',
  },
  titleContainer: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.palette.primary.main,
  },
  primary: {
    color: theme.palette.secondary.main,
  },
  multiline: {
    whiteSpace: 'pre-line',
  },
}));

interface AuthoritySearchResultProps {
  authority: Authority;
  className?: string;
}

export const AuthoritySearchResult = ({ className, authority }: AuthoritySearchResultProps) => {
  const primaryDocument = _.find(
    authority.authorityDocuments,
    (document) => document.isPrimary
  ) as AuthorityDocument;

  const classes = useStyles();

  // TODO: remove extra whitespace between fields when one field is undefined.
  return (
    <Card className={clsx(className, classes.layout)}>
      <Link to={`/authority/${authority.authorityId}`} className={classes.nav}>
        <CardActionArea>
          <CardContent>
            <Container className={classes.titleContainer}>
              <Typography className={classes.title} variant="subtitle1" component="h2">
                {authority.name}
              </Typography>
              {authority.isPrimary ? (
                <Typography className={classes.primary} variant="subtitle1" component="h3">
                  Principal
                </Typography>
              ) : null}
            </Container>
            <Typography
              className={classes.multiline}
              variant="subtitle2"
              component="h3"
              gutterBottom
            >
              {primaryDocument.citation}
              {'\n'}
              {primaryDocument.source.name}
              {'\n'}
              {primaryDocument.created && toIsoDateString(primaryDocument.created)}
            </Typography>
            <Typography
              className={classes.multiline}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {authority.overview}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
