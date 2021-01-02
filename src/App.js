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

firebase.initializeApp(firebaseProperties);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>Expensly</h1>
        <SignOut />
      </header>
      <section>{user ? <ExpenslyApp /> : <SignIn />}</section>
    </div>
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

  const [amount, setAmount] = useState(0.0);
  const [category, setCategory] = useState('Food');
  const [budget, setBudget] = useState('Household');
  const [description, setDescription] = useState('');

  const addExpense = async e => {
    e.preventDefault();

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
                  <TableCell align="right">{expense.amount}</TableCell>
                  <TableCell align="left">{expense.category}</TableCell>
                  <TableCell align="left">{expense.budget}</TableCell>
                  <TableCell align="left">{expense.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <form onSubmit={addExpense}>
        <p>
          <label>
            Amount:
            <input
              value={amount}
              pattern="[0-9]*"
              onChange={e => {
                try {
                  const amount = parseFloat(e.target.value);
                  if (!isNaN(amount)) {
                    setAmount(amount);
                  }
                } catch (err) {}
              }}
            />
          </label>
        </p>
        <p>
          <label>
            Category:
            <input
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Budget:
            <input value={budget} onChange={e => setBudget(e.target.value)} />
          </label>
        </p>
        <p>
          <label>
            Description:
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
        </p>
        <button type="submit">Add Expense</button>
      </form>
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
      Sign in with Google
    </Button>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <Button
        variant="contained"
        color="primary"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </Button>
    )
  );
}

export default App;
