import React, { useState } from 'react';
import '../App.css';

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function AddExpenseForm(props) {
  const [amount, setAmount] = useState(0.0);
  const [category, setCategory] = useState('Food');
  const [budget, setBudget] = useState('Household');
  const [description, setDescription] = useState('');

  const { addExpense } = props;

  const addExpenseLocal = async e => {
    e.preventDefault();
    addExpense(amount, category, budget, description);
  };

  return (
    <form onSubmit={addExpenseLocal}>
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
          <input value={category} onChange={e => setCategory(e.target.value)} />
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
      <Button variant="contained" color="primary" type="submit">
        Add Expense
      </Button>
    </form>
  );
}

export default AddExpenseForm;
