import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

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

  return (
    <Paper>
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
    </Paper>
  );
}
