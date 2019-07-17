import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import MuiTextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
  }
}));

function TextField(props) {
  return (
    <MuiTextField
      onChange={event => props.onChange(props.key, event.target.value)}
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

  // TODO: show errors.
  // TODO: show success.
  // const [validationError, setValidationError] = useState(null);
  // const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(null);

  const handleSubmit = async event => {
    // TODO: use onSubmit passed by props.
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  const handleDataChange = (key, value) => setData({ ...data, key: value });

  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.layout}>
      <Typography component="h1" variant="h5">
        {props.pageTitle}
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Title"
          key="title"
          name="title"
          autoFocus
          required
          onChange={handleDataChange}
          disabled={isSubmitting}
        />
        <TextField
          label="Description"
          key="description"
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
          {props.submitActionLabel}
        </Button>
      </form>
      {isSubmitting && <CircularProgress className={classes.progress} />}
    </Container>
  );
}

AuthorityEditor.propTypes = {
  pageTitle: PropTypes.string,
  submitActionLabel: PropTypes.string,
  onSubmit: PropTypes.func
};
