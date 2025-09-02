import { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpenseList({ type, editable = true, limit }) {
  const { expenses, deleteExpense, editExpense } = useContext(ExpenseContext);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dateDesc"); // default sorting

  const currency = localStorage.getItem("currency") || "₹";

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setEditText(expense.text);
    setEditAmount(expense.amount);
    setEditCategory(expense.category);
  };

  const handleEditSubmit = (id) => {
    editExpense(id, editText, editAmount, editCategory);
    setEditingId(null);
  };

  // Filter by type if provided and editable
  let displayedExpenses = editable && type
    ? expenses.filter(exp => exp.type === type)
    : [...expenses];

  // Filter by category only if editable
  if (editable && filter !== "All") {
    displayedExpenses = displayedExpenses.filter(exp => exp.category === filter);
  }

  // Sort
  displayedExpenses.sort((a, b) => {
    // If not editable (recent transactions), always newest first
    if (!editable) return b.id - a.id;

    if (sortBy === "amountAsc") return a.amount - b.amount;
    if (sortBy === "amountDesc") return b.amount - a.amount;
    if (sortBy === "dateAsc") return a.id - b.id;
    if (sortBy === "dateDesc") return b.id - a.id;
    return 0;
  });

  // Limit number of items if limit is set
  if (limit) displayedExpenses = displayedExpenses.slice(0, limit);

  return (
    <div className="card">
      {type && <h2>{type === "Expense" ? "Expenses" : "Income"}</h2>}
      
      {/* Filter & Sort only if editable */}
      {editable && (
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Bills">Bills</option>
            <option value="Travel">Travel</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="dateDesc">Newest First</option>
            <option value="dateAsc">Oldest First</option>
            <option value="amountAsc">Amount ↑</option>
            <option value="amountDesc">Amount ↓</option>
          </select>
        </div>
      )}

      {displayedExpenses.length === 0 ? (
        <p>No {type ? type.toLowerCase() : ""} added yet.</p>
      ) : (
        <ul>
          {displayedExpenses.map(exp => (
            <li
              key={exp.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
                padding: "10px",
                background: "#f8f8f8",
                borderRadius: "8px",
              }}
            >
              {editingId === exp.id && editable ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
                    <option value="Food">Food</option>
                    <option value="Bills">Bills</option>
                    <option value="Travel">Travel</option>
                    <option value="Salary">Salary</option>
                    <option value="Other">Other</option>
                  </select>
                  <button onClick={() => handleEditSubmit(exp.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>
                    {exp.text} -{" "}
                    <span style={{ color: exp.type === "Expense" ? "red" : "green" }}>
                      {currency}{Math.abs(exp.amount)}
                    </span>{" "}
                    [{exp.category}]
                  </span>
                  {editable && (
                    <>
                     <div style={{ display: "flex", gap: "10px" }}>
  <button onClick={() => startEdit(exp)}>Edit</button>
  <button className="delete-btn" onClick={() => deleteExpense(exp.id)}>
    Delete
  </button>
</div>
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
