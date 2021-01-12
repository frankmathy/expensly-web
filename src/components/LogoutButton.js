import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import firebase from 'firebase/app';
import 'firebase/auth';

function LogoutButton() {
  const auth = firebase.auth();

  return (
    auth.currentUser && (
      <IconButton
        color="inherit"
        aria-label="logout"
        onClick={() => auth.signOut()}
      >
        <ExitToAppIcon />
      </IconButton>
    )
  );
}

export default LogoutButton;
