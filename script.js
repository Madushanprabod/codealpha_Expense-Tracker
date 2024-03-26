document.addEventListener('DOMContentLoaded', function () {
  const expenseForm = document.getElementById('expense-form');
  const expensesList = document.getElementById('expenses-list');
  const totalExpense = document.getElementById('total-expense');
  const printButton = document.getElementById('print-button');
  const resetButton = document.getElementById('reset-button'); // Added Reset Button
  let total = 0;
  let expenses = [];

  // Retrieve expenses from local storage
  if (localStorage.getItem('expenses')) {
    expenses = JSON.parse(localStorage.getItem('expenses'));
    expenses.forEach(expense => {
      addExpenseToTable(expense);
    });
  }

  // Update total expense
  updateTotalExpense();

  // Event listener for form submission
  expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (description.trim() === '' || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid description and amount.');
      return;
    }

    // Create new expense object
    const expense = {
      id: Date.now(),
      description: description,
      amount: amount
    };

    // Add expense to expenses array
    expenses.push(expense);

    // Add expense to table
    addExpenseToTable(expense);

    // Update total expense
    updateTotalExpense();

    // Save expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Reset form fields
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
  });

  // Event listener for print button
  printButton.addEventListener('click', function () {
    printExpenses();
  });

  // Event listener for reset button
  resetButton.addEventListener('click', function () {
    resetExpenses();
  });

  // Function to add expense to table
  function addExpenseToTable(expense) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>$${expense.amount.toFixed(2)}</td>
    `;
    expensesList.appendChild(row);
  }

  // Function to update total expense
  function updateTotalExpense() {
    total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    totalExpense.textContent = `Total Expense: $${total.toFixed(2)}`;
  }

  // Function to print expenses
  function printExpenses() {
    let printContent = '';
    expenses.forEach(expense => {
      printContent += `Description: ${expense.description}, Amount: $${expense.amount.toFixed(2)}\n`;
    });
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<pre>${printContent}</pre>`);
    printWindow.document.close();
    printWindow.print();
  }

  // Function to reset expenses
  function resetExpenses() {
    expenses = [];
    localStorage.removeItem('expenses');
    expensesList.innerHTML = '';
    total = 0;
    totalExpense.textContent = `Total Expense: $${total.toFixed(2)}`;
  }
});
