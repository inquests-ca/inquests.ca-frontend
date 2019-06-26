import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  progress: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export default function InquestTable() {
  const [inquests, setInquests] = useState(null);

  const fetchInquests = async () => {
    const response = await fetch('/api/inquests');
    let json;
    try {
      json = await response.json();
    } catch (e) {
      // TODO: log, and display error in client.
      json = [];
    }
    setInquests(json);
  };

  useEffect(() => {
    if (inquests === null) fetchInquests();
  });

  const classes = useStyles();

  return (
    <Paper className={classes.layout}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        {inquests && (
          <TableBody>
            {inquests.map((inquest, i) => (
              <TableRow key={i}>
                <TableCell>{inquest.title}</TableCell>
                <TableCell>{inquest.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {!inquests && <CircularProgress className={classes.progress} />}
    </Paper>
  );
}
