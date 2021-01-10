import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { formatAmount, formatDateTime } from '../util/formatHelper';

function ExpenseTableRow(props) {
  const { expense, showExpenseDialog } = props;
  return (
    <TableRow key={expense.id} onClick={() => showExpenseDialog(expense)}>
      <TableCell>
        {expense.expenseDate ? formatDateTime(expense.expenseDate) : ''}
      </TableCell>
      <TableCell align="right">{formatAmount(expense.amount)}</TableCell>
      <TableCell align="left">{expense.category}</TableCell>
      <TableCell align="left">{expense.budget}</TableCell>
      <TableCell align="left">{expense.description}</TableCell>
    </TableRow>
  );
}

export default ExpenseTableRow;
