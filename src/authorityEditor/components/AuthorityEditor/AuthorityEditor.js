import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import MuiTextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Toast from 'common/components/Toast';

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
  progress: {
    marginTop: theme.spacing(2)
  },
  errorAlert: {
    position: 'absolute',
    bottom: theme.spacing(2)
  }
}));

function TextField(props) {
  return (
    <MuiTextField
      onChange={event => props.onChange(props.dataKey, event.target.value)}
      label={props.label}
      name={props.name}
      required={props.required}
      autoFocus={props.autoFocus}
      disabled={props.disabled}
      variant="outlined"
      margin="normal"
      fullWidth
    />
  );
}

// This component serves as a general editor for creating or modifying
// authorities.
export default function AuthorityEditor(props) {
  const [data, setData] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [created, setCreated] = useState(false);
  // TODO: display Toast when authority successfully created.

  const { pageTitle, submitActionLabel, onSubmit } = props;

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    const result = await onSubmit(data);
    setIsSubmitting(false);
    if (result.error) {
      setSubmitError(result.error);
    } else {
      setCreated(true);
    }
  };

  const handleDataChange = (key, value) => setData({ ...data, [key]: value });
  const handleSubmitErrorClosed = () => setSubmitError(null);

  const classes = useStyles();

  // TODO: redirect to authority page.
  if (created) return <Redirect to="/" />;

  return (
    <Container maxWidth="xs" className={classes.layout}>
      <Typography component="h1" variant="h5">
        {pageTitle}
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Title"
          dataKey="title"
          name="title"
          autoFocus
          required
          onChange={handleDataChange}
          disabled={isSubmitting}
        />
        <TextField
          label="Description"
          dataKey="description"
          name="description"
          onChange={handleDataChange}
          disabled={isSubmitting}
        />
        <Button
          className={classes.submit}
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {submitActionLabel}
        </Button>
      </form>
      {isSubmitting && <CircularProgress className={classes.progress} />}
      {submitError && (
        <Toast
          className={classes.errorAlert}
          onClose={handleSubmitErrorClosed}
          message={submitError}
          variant="error"
        />
      )}
    </Container>
  );
}

AuthorityEditor.propTypes = {
  pageTitle: PropTypes.string,
  submitActionLabel: PropTypes.string,
  onSubmit: PropTypes.func
};
