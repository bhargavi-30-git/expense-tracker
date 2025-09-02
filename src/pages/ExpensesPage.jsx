import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpensesPage() {
  const { expenses, deleteExpense } = useContext(ExpenseContext);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dateDesc");
  const currency = localStorage.getItem("currency") || "₹";

  // Filter and sort expenses
  let expenseItems = expenses.filter(exp => exp.type === "Expense");
  if (filter !== "All") expenseItems = expenseItems.filter(exp => exp.category === filter);

  expenseItems = expenseItems.sort((a, b) => {
    if (sortBy === "amountAsc") return a.amount - b.amount;
    if (sortBy === "amountDesc") return b.amount - a.amount;
    if (sortBy === "dateAsc") return a.id - b.id;
    if (sortBy === "dateDesc") return b.id - a.id;
    return 0;
  });

  return (
    <div className="page card">
      <h2>Expenses</h2>

      {/* Filter & Sort Controls */}
      <div style={{ marginBottom: "20px" }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Bills">Bills</option>
          <option value="Travel">Travel</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="dateDesc">Newest First</option>
          <option value="dateAsc">Oldest First</option>
          <option value="amountAsc">Amount ↑</option>
          <option value="amountDesc">Amount ↓</option>
        </select>
      </div>

      <ul>
        {expenseItems.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          expenseItems.map(exp => (
            <li key={exp.id}>
              {exp.text} - {currency}{Math.abs(exp.amount)} [{exp.category}]
              <button
                className="delete-btn"
                onClick={() => deleteExpense(exp.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
