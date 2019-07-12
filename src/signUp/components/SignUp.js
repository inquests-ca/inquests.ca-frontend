import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import Toast from '../../common/components/Toast';
import { signUp } from '../../common/services/firebase';

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
  },
  errorAlert: {
    marginTop: theme.spacing(2)
  },
  progress: {
    marginTop: theme.spacing(2)
  }
}));

const errorMessages = {
  'auth/email-already-in-use': 'Email already in use',
  'auth/invalid-email': 'Invalid email',
  'auth/weak-password': 'Password should be at least 6 characters'
};

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signUpError, setSignUpError] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    setSignUpError(null);
    setIsSigningUp(true);
    const result = await signUp(email, password);
    // If the sign up is successful, this component will be unmounted.
    // Therefore, only perform state updates if an error occured.
    if (result.errorCode) {
      setIsSigningUp(false);
      setSignUpError(
        errorMessages[result.errorCode] || 'An unknown error occurred'
      );
    }
  };

  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);
  const handleSignUpErrorClosed = () => setSignUpError(null);

  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.layout}>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      {signUpError && (
        <Toast
          className={classes.errorAlert}
          onClose={handleSignUpErrorClosed}
          message={signUpError}
          variant="error"
        />
      )}
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          onChange={handleEmailChange}
          disabled={isSigningUp}
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
          disabled={isSigningUp}
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
          disabled={isSigningUp}
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
      {isSigningUp && <CircularProgress className={classes.progress} />}
    </Container>
  );
}
