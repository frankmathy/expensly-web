import React from 'react';

import Button from '@material-ui/core/Button';

import firebase from 'firebase/app';
import 'firebase/auth';

function LogoutButton() {
  const auth = firebase.auth();

  return (
    auth.currentUser && <Button onClick={() => auth.signOut()}>Sign Out</Button>
  );
}

export default LogoutButton;
