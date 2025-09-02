import { useState } from "react";

export default function SettingsPage() {
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "₹");

  const handleCurrencyChange = (e) => {
    const value = e.target.value;
    setCurrency(value);
    localStorage.setItem("currency", value);
  };

  return (
    <div className="page card">
      <h2>Settings</h2>
      
      <label>Choose Currency:</label>
      <select value={currency} onChange={handleCurrencyChange}>
        <option value="₹">₹ - INR</option>
        <option value="$">$ - USD</option>
        <option value="€">€ - EUR</option>
        <option value="£">£ - GBP</option>
      </select>
    </div>
  );
}
