import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { getAuthorities } from '../../../common/services/authorityApi';

const useStyles = makeStyles(theme => ({
  progress: {
    marginTop: theme.spacing(4)
  }
}));

export default function AuthorityTable(props) {
  const [authorities, setAuthorities] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const { className, keywords } = props;

  useEffect(() => {
    const fetchAuthorities = async () => {
      const response = await getAuthorities([]);
      if (!response.error) {
        setAuthorities(response.data);
        setIsFetching(false);
      }
    };

    setIsFetching(true);
    fetchAuthorities();
  }, []);

  useEffect(() => {
    const fetchAuthorities = async () => {
      const response = await getAuthorities(keywords);
      if (!response.error) {
        setAuthorities(response.data);
        setIsFetching(false);
      }
    };

    setIsFetching(true);
    fetchAuthorities();
  }, [keywords]);

  const classes = useStyles();

  return (
    <div className={className}>
      {authorities && (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {authorities.map((authority, i) => (
                <TableRow key={i}>
                  <TableCell>{authority.name}</TableCell>
                  <TableCell>{authority.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
      {isFetching && <CircularProgress className={classes.progress} />}
    </div>
  );
}
