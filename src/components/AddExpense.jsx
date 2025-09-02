import { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function AddExpense() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other"); // default category
  const [type, setType] = useState("Expense"); // default type
  const { addExpense } = useContext(ExpenseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    addExpense(text, +amount, category, type);

    // Reset form
    setText("");
    setAmount("");
    setCategory("Other");
    setType("Expense");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="text"
        placeholder="Enter description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Bills">Bills</option>
        <option value="Travel">Travel</option>
        <option value="Salary">Salary</option>
        <option value="Other">Other</option>
      </select>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}
