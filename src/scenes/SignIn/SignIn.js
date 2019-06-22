import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  layout: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  submit: {
    marginTop: theme.spacing(2)
  },
  signUpLink: {
    marginTop: theme.spacing(2),
    textDecoration: 'none'
  }
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.layout}>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <form className={classes.form}>
        <TextField
          label="Email"
          name="email"
          autoComplete="email"
          required
          variant="outlined"
          autoFocus
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          className={classes.submit}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Sign In
        </Button>
      </form>
      <Link to="/signup" className={classes.signUpLink}>
        Don't have an account? Sign up.
      </Link>
    </Container>
  );
}
