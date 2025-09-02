import ExpenseList from "../components/ExpenseList";

export default function IncomePage() {
  return (
    <div className="page">
      {/* <h2>Income</h2> */}
      <ExpenseList type="Income" editable={true} />
    </div>
  );
}
