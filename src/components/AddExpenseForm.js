import React, { useState } from "react";
import "../App.css";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { parseAmount } from "../util/formatHelper";
import { categories, budgets } from "../model/defaults";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AddExpenseForm(props) {
  const [amount, setAmount] = useState(0.0);
  const [category, setCategory] = useState(categories[0]);
  const [budget, setBudget] = useState(budgets[0]);
  const [description, setDescription] = useState("");

  const { addExpense } = props;

  const classes = useStyles();

  const addExpenseLocal = async (e) => {
    e.preventDefault();
    const amountValue = parseAmount(amount);
    addExpense(amountValue, category, budget, description);
    setAmount(0.0);
    setDescription("");
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
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories &&
                    categories.map((category) => (
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
                  onChange={(e) => setBudget(e.target.value)}
                >
                  {budgets &&
                    budgets.map((budget) => (
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
                onChange={(e) => setDescription(e.target.value)}
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
