import React, { useState } from 'react';
import './App.css';
import firebaseProperties from './firebaseProperties';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import ExpenseTable from './components/ExpenseTable';
import ExpenseDialog from './components/ExpenseDialog';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

firebase.initializeApp(firebaseProperties);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container maxWidth="md">
        <CssBaseline />
        <div className="App">
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
          <section>{user ? <ExpenslyApp /> : <LoginButton />}</section>
        </div>
      </Container>
    </MuiPickersUtilsProvider>
  );
}

function ExpenslyApp(props) {
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
    const { uid } = auth.currentUser;
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
      <Button
        variant="contained"
        color="primary"
        onClick={e => showExpenseDialog(null)}
      >
        Add Expense
      </Button>

      <ExpenseTable expenses={expenses} showExpenseDialog={showExpenseDialog} />

      <ExpenseDialog
        addExpense={addExpense}
        updateExpense={updateExpense}
        deleteExpense={deleteExpense}
        expense={editedExpense}
        open={expenseDialogVisible}
        onClose={() => setExpenseDialogVisible(false)}
      />
    </>
  );
}

export default App;
