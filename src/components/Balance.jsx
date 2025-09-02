import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function Balance() {
  const { expenses } = useContext(ExpenseContext);
  const currency = localStorage.getItem("currency") || "₹";

  // Calculate totals using type
  const income = expenses
    .filter(exp => exp.type === "Income")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = expenses
    .filter(exp => exp.type === "Expense")
    .reduce((acc, item) => acc + Math.abs(item.amount), 0);

  const total = income - expense;

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h2>Balance: {currency}{total}</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div
          style={{
            background: "#e6ffe6",
            padding: "15px",
            borderRadius: "10px",
            minWidth: "120px",
          }}
        >
          <h3 style={{ margin: 0, color: "green" }}>Income</h3>
          <p style={{ margin: 0 }}>{currency}{income}</p>
        </div>
        <div
          style={{
            background: "#ffe6e6",
            padding: "15px",
            borderRadius: "10px",
            minWidth: "120px",
          }}
        >
          <h3 style={{ margin: 0, color: "red" }}>Expense</h3>
          <p style={{ margin: 0 }}>{currency}{expense}</p>
        </div>
      </div>
    </div>
  );
}
