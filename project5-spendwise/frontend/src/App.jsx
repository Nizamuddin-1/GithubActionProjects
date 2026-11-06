import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const loadData = async () => {
    try {
      const [resExp, resSum] = await Promise.all([
        fetch(`${API_BASE}/api/expenses`),
        fetch(`${API_BASE}/api/summary`)
      ]);
      const dataExp = await resExp.json();
      const dataSum = await resSum.json();
      if (Array.isArray(dataExp)) setExpenses(dataExp);
      if (Array.isArray(dataSum)) setSummary(dataSum);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const addExpense = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    await fetch(`${API_BASE}/api/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, amount: Number(amount), category })
    });
    setTitle('');
    setAmount('');
    loadData();
  };

  const totalSpent = summary.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="container">
      <h1>SpendWise Tracker (Serverless Lambda)</h1>
      <div className="summary-banner">
        <h3>Total Expenditure</h3>
        <h1 className="total-display">${totalSpent.toFixed(2)}</h1>
      </div>

      <form onSubmit={addExpense} className="expense-form">
        <input 
          placeholder="Item name" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
          className="input-item"
        />
        <input 
          placeholder="Amount ($)" 
          type="number" 
          step="0.01" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          required 
          className="input-amount"
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {['Food', 'Rent', 'Utilities', 'Entertainment', 'Misc'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button type="submit" className="btn-add">Add</button>
      </form>

      <h3>Recent Transactions</h3>
      <div className="tx-list">
        {expenses.length === 0 ? (
          <p style={{ color: '#888' }}>No expenses recorded yet.</p>
        ) : (
          expenses.map(item => (
            <div key={item._id} className="tx-item">
              <div>
                <strong>{item.title}</strong>
                <span className="badge-cat">{item.category}</span>
              </div>
              <strong className="tx-amount">-${item.amount.toFixed(2)}</strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

