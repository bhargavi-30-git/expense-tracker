import Summary from "../components/Summary";
import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";

export default function HomePage() {
  return (
    <div className="page" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Summary />
      <AddExpense />
      <h2>Recent Transactions</h2>
      {/* Show only 5 most recent transactions with filter & sort */}
      <ExpenseList editable={true} limit={5} />
    </div>
  );
}
