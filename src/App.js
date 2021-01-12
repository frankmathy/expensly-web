import React from 'react';
import './App.css';
import firebaseProperties from './firebaseProperties';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import ExpensesApp from './components/ExpensesApp';
import LoginButton from './components/LoginButton';

firebase.initializeApp(firebaseProperties);
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(firebase.auth());

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container maxWidth="md">
        <CssBaseline />
        {user ? (
          <ExpensesApp user={user} firestore={firestore} />
        ) : (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
          >
            <Typography variant="h4" gutterBottom>
              Expensly
            </Typography>{' '}
            <Grid item xs={12} m={3}>
              <LoginButton />
            </Grid>
          </Grid>
        )}
      </Container>
    </MuiPickersUtilsProvider>
  );
}

export default App;
