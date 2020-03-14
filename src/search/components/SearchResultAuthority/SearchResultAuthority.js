import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  layout: {
    textAlign: 'left',
    height: 100,
    margin: theme.spacing(1)
  }
}));

export default function SearchResultAuthority(props) {
  const { className, authority } = props;

  const classes = useStyles();

  // TODO: add link to authority page.
  return (
    <Card className={clsx(className, classes.layout)}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {authority.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {authority.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
