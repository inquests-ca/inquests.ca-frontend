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

import { toIsoDateString } from 'common/services/utils';

const useStyles = makeStyles(theme => ({
  layout: {
    textAlign: 'left',
    maxHeight: 200,
    marginTop: theme.spacing(2)
  },
  // Prevent default anchor styling.
  nav: {
    textDecoration: 'none',
    color: 'inherit'
  },
  titleContainer: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    color: theme.palette.primary.main
  },
  primary: {
    color: theme.palette.secondary.main
  },
  multiline: {
    whiteSpace: 'pre-line'
  }
}));

export default function SearchResultInquest(props) {
  const { className, inquest } = props;

  // Used to create an overview if one is not provided.
  const createOverview = inquest => {
    // In most cases there is only one deceased. Handle this case separately to avoid unnecessary computation.
    if (inquest.deceased.length === 1) {
      const deceased = inquest.deceased[0];
      return `${deceased.inquestType.name} — ${deceased.deathManner.name} — ${deceased.deathCause}`;
    } else {
      const inquestTypes = _.uniq(inquest.deceased.map(d => d.inquestType.name)).join(', ');
      const mannersOfDeath = _.uniq(inquest.deceased.map(d => d.deathManner.name)).join(', ');
      const causesOfDeath = inquest.deceased.map(d => d.deathCause).join(', ');
      return `${inquestTypes} — ${mannersOfDeath} — ${causesOfDeath}`;
    }
  };

  const classes = useStyles();

  return (
    <Card className={clsx(className, classes.layout)}>
      <Link to={`/inquest/${inquest.inquestId}`} className={classes.nav}>
        <CardActionArea>
          <CardContent>
            <Container className={classes.titleContainer}>
              <Typography className={classes.title} variant="subtitle1" component="h2">
                {inquest.name}
              </Typography>
              {inquest.isPrimary ? (
                <Typography className={classes.primary} variant="subtitle1" component="h3">
                  Pivotal
                </Typography>
              ) : null}
            </Container>
            <Typography
              className={classes.multiline}
              variant="subtitle2"
              component="h3"
              gutterBottom
            >
              {inquest.jurisdiction.name}
              {'\n'}
              {toIsoDateString(inquest.start)}
            </Typography>
            <Typography
              className={classes.multiline}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {inquest.overview || createOverview(inquest)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
