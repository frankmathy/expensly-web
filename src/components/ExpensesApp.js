import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Header from './Header';

import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ExpenseTable from './ExpenseTable';
import ExpenseDialog from './ExpenseDialog';

function ExpensesApp(props) {
  const { user, firestore } = props;
  const expensesRef = firestore.collection('expenses');
  const query = expensesRef.orderBy('expenseDate', 'desc');
  const [expenses] = useCollectionData(query, { idField: 'id' });
  const [expenseDialogVisible, setExpenseDialogVisible] = useState(false);
  const [editedExpense, setEditedExpense] = useState(null);

  const addExpense = async (
    expenseDate,
    amount,
    category,
    budget,
    description
  ) => {
    const { uid } = user;
    await expensesRef.add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      expenseDate,
      uid,
      amount,
      category,
      budget,
      description
    });
  };

  const updateExpense = async expense => {
    await expensesRef.doc(expense.id).update(expense);
  };

  const deleteExpense = async expense => {
    await expensesRef.doc(expense.id).delete();
  };

  const showExpenseDialog = editedExpense => {
    setEditedExpense(editedExpense);
    setExpenseDialogVisible(true);
  };

  return (
    <Grid container direction="column" spacing="2">
      <Grid item>
        <Header user={user} showExpenseDialog={showExpenseDialog} />
      </Grid>
      <Grid item>
        <ExpenseTable
          expenses={expenses}
          showExpenseDialog={showExpenseDialog}
        />

        <ExpenseDialog
          addExpense={addExpense}
          updateExpense={updateExpense}
          deleteExpense={deleteExpense}
          expense={editedExpense}
          open={expenseDialogVisible}
          onClose={() => setExpenseDialogVisible(false)}
        />
      </Grid>
    </Grid>
  );
}

export default ExpensesApp;
