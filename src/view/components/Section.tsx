import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  sectionDivider: {
    height: '2px',
    marginBottom: theme.spacing(2)
  }
}));

interface SectionProps {
  header: string;
  children: React.ReactNode;
}

const Section = ({ header, children }: SectionProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.section}>
      <Typography variant="h6" component="h3">
        {header}
      </Typography>
      <Divider className={classes.sectionDivider} />
      {children}
    </Paper>
  );
};

export default Section;
