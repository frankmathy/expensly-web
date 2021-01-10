import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ExpenseTable from './ExpenseTable';
import ExpenseDialog from './ExpenseDialog';
import LogoutButton from './LogoutButton';

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
    <>
      <header>
        <AppBar>
          <Toolbar>
            <IconButton>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Expensly</Typography>
            {user && <LogoutButton />}
          </Toolbar>
        </AppBar>
      </header>
      <section>
        <Button
          variant="contained"
          color="primary"
          onClick={e => showExpenseDialog(null)}
        >
          Add Expense
        </Button>

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
      </section>
    </>
  );
}

export default ExpensesApp;
