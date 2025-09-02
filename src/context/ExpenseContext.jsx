import { createContext, useState } from "react";

export const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (text, amount, category, type) => {
    const newExpense = { id: Date.now(), text, amount, category, type };
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const editExpense = (id, newText, newAmount, newCategory) => {
    setExpenses(
      expenses.map(exp =>
        exp.id === id
          ? { ...exp, text: newText, amount: +newAmount, category: newCategory }
          : exp
      )
    );
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, editExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}
