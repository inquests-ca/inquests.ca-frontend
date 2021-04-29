import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    margin: `${theme.spacing(6)}px ${theme.spacing(12)}px`,
  },
  text: {
    marginBottom: theme.spacing(2),
  },
}));

function Section({
  children,
  title,
  classes,
}: {
  children: React.ReactNode;
  title: string;
  classes: any;
}) {
  return (
    <>
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
      <Typography className={classes.text} variant="body1" component="p">
        {children}
      </Typography>
    </>
  );
}

// TODO: make reusable components for static pages.
export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Typography variant="h4" component="h1">
        About
      </Typography>
      <Typography className={classes.text} variant="body1" component="p">
        <em>Inquests.ca</em> is a public repository of Canadian inquest findings and
        recommendations, with reference materials including relevant case law, procedures, and
        public safety issues. It is intended to assist public understanding of the inquest process,
        and inquest findings.
      </Typography>
      <Section title="Contact" classes={classes}>
        Questions or suggestions? Looking for a customized search of our database? Contact us at{' '}
        <Link href="mailto:askinquestsca@gmail.com">askinquestsca@gmail.com</Link>.
      </Section>
      <Section title="Credits" classes={classes}>
        This website was developed and designed by Michael Eden. The content on this website was
        coordinated by David Eden.
        <br />
        <br />
        We would like to thank those who have taken the time to help us test the website, given us
        feedback, or supplied us with inquest data. Your contributions have allowed us to make{' '}
        <em>Inquests.ca</em> what it is today.
      </Section>
    </div>
  );
}
