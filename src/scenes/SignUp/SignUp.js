import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { signUp } from './services/signUp.js';

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
  signInLink: {
    marginTop: theme.spacing(2),
    textDecoration: 'none'
  }
}));

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setSignUpError = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    const handleSignUpError = error => setSignUpError(error.message);
    await signUp(email, password, handleSignUpError);
  };

  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.layout}>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          onChange={handleEmailChange}
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
          onChange={handlePasswordChange}
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
          Create Account
        </Button>
      </form>
      <Link to="/signin" className={classes.signInLink}>
        Already have an account? Sign in.
      </Link>
    </Container>
  );
}
