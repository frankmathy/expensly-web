import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCfiKBzRZO_wlDXnQTZaXTFiKAMAayofe0',
  authDomain: 'expensly-7d58c.firebaseapp.com',
  projectId: 'expensly-7d58c',
  storageBucket: 'expensly-7d58c.appspot.com',
  messagingSenderId: '23157306174',
  appId: '1:23157306174:web:24c65f3a4e0bbbeabcf26f',
  measurementId: 'G-57C5XJ3XLT'
});

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

  return (
    <>
      <div>
        {expenses &&
          expenses.map(expense => (
            <ExpenseLine key={expense.id} expense={expense} />
          ))}
      </div>
    </>
  );
}

function ExpenseLine(props) {
  const { amount, createdAt, category, budget, description } = props.expense;
  return (
    <p>
      {createdAt}: {description} €{amount} {category})
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
