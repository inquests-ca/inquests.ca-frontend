import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = theme => ({
  layout: {
    marginTop: theme.spacing(4)
  }
});

class InquestTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inquests: [] };
  }

  componentDidMount() {
    this.fetchInquests();
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.layout}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.inquests.map((inquest, i) => (
              <TableRow key={i}>
                <TableCell>{inquest.title}</TableCell>
                <TableCell>{inquest.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  async fetchInquests() {
    const response = await fetch('/api/inquests');
    let inquests;
    try {
      inquests = await response.json();
    } catch (e) {
      // TODO: log, and display error in client.
      inquests = [];
    }
    this.setState({ inquests: inquests });
  }
}

export default withStyles(styles)(InquestTable);