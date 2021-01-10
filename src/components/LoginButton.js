import React from 'react';

import Button from '@material-ui/core/Button';

import firebase from 'firebase/app';
import 'firebase/auth';

function LoginButton() {
  const auth = firebase.auth();

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

export default LoginButton;
