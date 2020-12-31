import React, { useState } from 'react';
import './App.css';
import firebaseProperties from './firebaseProperties';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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

function ExpenslyApp() {
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
      <div>
        {expenses &&
          expenses.map(expense => (
            <ExpenseLine key={expense.id} expense={expense} />
          ))}
      </div>

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

function ExpenseLine(props) {
  const { amount, createdAt, category, budget, description } = props.expense;
  return (
    <p>
      {createdAt.toDate().toString()}: {description} for €{amount} {category}-
      {budget}
    </p>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export default App;
