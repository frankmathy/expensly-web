import React, { useState } from 'react';
import '../App.css';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function AddExpenseForm(props) {
  const [amount, setAmount] = useState(0.0);
  const [category, setCategory] = useState('Food');
  const [budget, setBudget] = useState('Household');
  const [description, setDescription] = useState('');

  const { addExpense } = props;

  const classes = useStyles();

  const addExpenseLocal = async e => {
    e.preventDefault();
    addExpense(amount, category, budget, description);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div classes={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountBalanceIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Expense
        </Typography>
        <form className={classes.form} noValidate onSubmit={addExpenseLocal}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CurrencyTextField
                value={amount}
                label="Amount"
                variant="outlined"
                fullwidth
                required
                currencySymbol="€"
                outputFormat="string"
                decimalCharacter=","
                digitGroupSeparator="."
                onChange={(event, value) => setAmount(value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                value={category}
                label="Category"
                onChange={(event, value) => setCategory(value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                value={budget}
                label="Budget"
                onChange={(event, value) => setBudget(value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                value={description}
                label="Description"
                onChange={(event, value) => setDescription(value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            className={classes.submit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Add Expense
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default AddExpenseForm;
