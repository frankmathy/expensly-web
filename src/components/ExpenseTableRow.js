import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Hidden from '@material-ui/core/Hidden';
import { formatAmount, formatDate } from '../util/formatHelper';

function ExpenseTableRow(props) {
  const { expense, showExpenseDialog } = props;
  return (
    <TableRow key={expense.id} onClick={() => showExpenseDialog(expense)}>
      <TableCell>
        {expense.expenseDate ? formatDate(expense.expenseDate) : ''}
      </TableCell>
      <TableCell align="right">{formatAmount(expense.amount)}</TableCell>
      <TableCell align="left">{expense.category}</TableCell>
      <TableCell align="left">{expense.budget}</TableCell>
      <Hidden xsDown>
        <TableCell align="left">{expense.description}</TableCell>
      </Hidden>
    </TableRow>
  );
}

export default ExpenseTableRow;
