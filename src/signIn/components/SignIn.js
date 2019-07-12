import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import Toast from '../../common/components/Toast';
import { signIn } from '../../common/services/firebase';

// There is lots of overlap between this component and SignUp.
// TODO: reduce code duplication btwn components.
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
  },
  errorAlert: {
    marginTop: theme.spacing(2)
  },
  progress: {
    marginTop: theme.spacing(2)
  }
}));

const errorMessages = {
  'auth/invalid-email': 'Invalid email',
  'auth/user-disabled': 'This account has been disabled',
  'auth/user-not-found': 'Incorrect email or password',
  'auth/wrong-password': 'Incorrect email or password'
};

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    setSignInError(null);
    setIsSigningIn(true);
    const result = await signIn(email, password);
    // If the sign in is successful, this component will be unmounted.
    // Therefore, only perform state updates if an error occured.
    if (result.errorCode) {
      setIsSigningIn(false);
      setSignInError(
        errorMessages[result.errorCode] || 'An unknown error occurred'
      );
    }
  };

  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);
  const handleSignInErrorClosed = () => setSignInError(null);

  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.layout}>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      {signInError && (
        <Toast
          className={classes.errorAlert}
          onClose={handleSignInErrorClosed}
          message={signInError}
          variant="error"
        />
      )}
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          onChange={handleEmailChange}
          disabled={isSigningIn}
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
          disabled={isSigningIn}
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
          disabled={isSigningIn}
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
      {isSigningIn && <CircularProgress className={classes.progress} />}
    </Container>
  );
}
