// script.js

const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transactions");
const incomeEl = document.getElementById("income");
const expensesEl = document.getElementById("expenses");
const balanceEl = document.getElementById("balance");

let transactions = [];

function updateSummary() {
  const income = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = income + expenses;

  incomeEl.textContent = `R$ ${income.toFixed(2)}`;
  expensesEl.textContent = `R$ ${Math.abs(expenses).toFixed(2)}`;
  balanceEl.textContent = `R$ ${balance.toFixed(2)}`;
}

function addTransaction(description, amount) {
  const transaction = { description, amount: parseFloat(amount) };
  transactions.push(transaction);
  renderTransactions();
  updateSummary();
}

function renderTransactions() {
  transactionList.innerHTML = "";
  transactions.forEach(transaction => {
    const li = document.createElement("li");
    li.className = transaction.amount > 0 ? "income" : "expense";
    li.innerHTML = `
      ${transaction.description} 
      <span>R$ ${transaction.amount.toFixed(2)}</span>
    `;
    transactionList.appendChild(li);
  });
}

transactionForm.addEventListener("submit", event => {
  event.preventDefault();
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;

  if (description && amount) {
    addTransaction(description, amount);
    transactionForm.reset();
  }
});
