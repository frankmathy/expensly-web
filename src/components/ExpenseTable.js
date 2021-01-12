import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import ExpenseTableRow from './ExpenseTableRow';

function ExpenseTable(props) {
  const { expenses, showExpenseDialog } = props;

  const useStyles = makeStyles({
    table: {}
  });

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Expenses">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Budget</TableCell>
            <Hidden xsDown>
              <TableCell align="left">Description</TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses &&
            expenses.map(expense => (
              <ExpenseTableRow
                expense={expense}
                showExpenseDialog={showExpenseDialog}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpenseTable;
