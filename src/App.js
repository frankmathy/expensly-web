import React, { useState } from 'react';
import './App.css';
import firebaseProperties from './firebaseProperties';

import Button from '@material-ui/core/Button';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import AddExpenseForm from './components/AddExpenseForm';

firebase.initializeApp(firebaseProperties);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <Container maxWidth="md">
      <div className="App">
        <header>
          <AppBar>
            <Toolbar>
              <IconButton>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">Expensly</Typography>
              {user && <SignOut />}
            </Toolbar>
          </AppBar>
        </header>
        <section>{user ? <ExpenslyApp /> : <SignIn />}</section>
      </div>
    </Container>
  );
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function ExpenslyApp() {
  const classes = useStyles();

  const expensesRef = firestore.collection('expenses');
  const query = expensesRef.orderBy('createdAt').limit(50);
  const [expenses] = useCollectionData(query, { idField: 'id' });

  const addExpense = async (amount, category, budget, description) => {
    const { uid } = auth.currentUser;
    await expensesRef.add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      amount,
      category,
      budget,
      description
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Expenses">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Budget</TableCell>
              <TableCell align="left">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses &&
              expenses.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell>
                    {expense.createdAt
                      ? `${expense.createdAt
                          .toDate()
                          .toLocaleDateString()} ${expense.createdAt
                          .toDate()
                          .toLocaleTimeString()}`
                      : ''}
                  </TableCell>
                  <TableCell align="right">
                    {new Intl.NumberFormat('de-DE', {
                      style: 'currency',
                      currency: 'EUR'
                    }).format(expense.amount)}
                  </TableCell>
                  <TableCell align="left">{expense.category}</TableCell>
                  <TableCell align="left">{expense.budget}</TableCell>
                  <TableCell align="left">{expense.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddExpenseForm addExpense={addExpense} />
    </>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <Button variant="contained" color="primary" onClick={signInWithGoogle}>
      Sign In with Google
    </Button>
  );
}

function SignOut() {
  return (
    auth.currentUser && <Button onClick={() => auth.signOut()}>Sign Out</Button>
  );
}

export default App;
