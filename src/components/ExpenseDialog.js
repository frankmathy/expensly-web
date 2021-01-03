import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { parseAmount, makeDate } from '../util/formatHelper';
import { categories, budgets } from '../model/defaults';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, DialogActions } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import * as moment from 'moment';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function ExpenseDialog(props) {
  const [expenseDate, setExpenseDate] = useState(moment(new Date()));
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [budget, setBudget] = useState(budgets[0]);
  const [description, setDescription] = useState('');
  const {
    onClose,
    addExpense,
    updateExpense,
    deleteExpense,
    open,
    expense
  } = props;
  const [saveButtonText, setSaveButtonText] = useState('');
  const [title, setTitle] = useState('');

  const classes = useStyles();

  const saveAndClose = async e => {
    const amountValue = parseAmount(amount);
    if (!expense) {
      addExpense(
        makeDate(expenseDate),
        amountValue,
        category,
        budget,
        description
      );
    } else {
      expense.amount = amountValue;
      expense.category = category;
      expense.budget = budget;
      expense.description = description;
      expense.expenseDate = makeDate(expenseDate);
      updateExpense(expense);
    }
    setAmount(0.0);
    setDescription('');
    onClose();
  };

  const deleteAndClose = async e => {
    deleteExpense(expense);
    setAmount(0.0);
    setDescription('');
    onClose();
  };

  useEffect(() => {
    setAmount(expense ? expense.amount : 0.0);
    setCategory(expense ? expense.category : categories[0]);
    setBudget(expense ? expense.budget : budgets[0]);
    setDescription(expense ? expense.description : '');
    setSaveButtonText(expense ? 'Update' : 'Add');
    setExpenseDate(expense ? expense.expenseDate.toDate() : new Date());
    setTitle(expense ? 'Edit Expense' : 'Add Expense');
  }, [expense]);

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DateTimePicker
              autoOk
              label="Expense Date"
              ampm={false}
              disableFuture
              value={expenseDate}
              onChange={setExpenseDate}
            />
          </Grid>
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
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {categories &&
                  categories.map(category => (
                    <MenuItem value={category}>{category}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Budget</InputLabel>
              <Select
                labelId="budget-label"
                id="budget-select"
                value={budget}
                onChange={e => setBudget(e.target.value)}
              >
                {budgets &&
                  budgets.map(budget => (
                    <MenuItem value={budget}>{budget}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              value={description}
              label="Description"
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.submit}
          variant="contained"
          color="default"
          onClick={e => onClose()}
        >
          Cancel
        </Button>
        <Button
          className={classes.submit}
          variant="contained"
          color="primary"
          onClick={e => saveAndClose()}
        >
          {saveButtonText}
        </Button>
        {expense && (
          <Button
            className={classes.submit}
            variant="contained"
            color="secondary"
            onClick={e => deleteAndClose()}
          >
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

ExpenseDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default ExpenseDialog;
