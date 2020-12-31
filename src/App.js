import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks';

firebase.initializeApp({
  apiKey: 'AIzaSyCfiKBzRZO_wlDXnQTZaXTFiKAMAayofe0',
  authDomain: 'expensly-7d58c.firebaseapp.com',
  projectId: 'expensly-7d58c',
  storageBucket: 'expensly-7d58c.appspot.com',
  messagingSenderId: '23157306174',
  appId: '1:23157306174:web:24c65f3a4e0bbbeabcf26f',
  measurementId: 'G-57C5XJ3XLT'
});

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
