import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  title: {
    fontSize: '5rem',
  },
  subtitle: {
    marginBottom: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const Homepage = () => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Typography className={classes.title} variant="h1" component="h1">
        Inquests.ca
      </Typography>
      <Typography className={classes.subtitle} variant="h6" component="h2">
        A repository of Canadian inquest-related rulings, findings, and other authorities.
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        component={Link}
        to="/authorities"
      >
        Search Authorities
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        component={Link}
        to="/inquests"
      >
        Search Inquests
      </Button>
    </div>
  );
};

export default Homepage;
