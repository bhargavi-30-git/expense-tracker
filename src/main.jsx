import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ExpenseProvider } from "./context/ExpenseContext";

import Home from "./pages/Home";
import ExpensesPage from "./pages/ExpensesPage";
import IncomePage from "./pages/IncomePage";
import SettingsPage from "./pages/SettingsPage";

import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Expense Tracker</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/income">Income</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ExpenseProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ExpenseProvider>
);
