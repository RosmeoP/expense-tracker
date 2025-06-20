import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import TransactionCard, { type Transaction } from '../components/TransactionCard';
import TransactionForm from '../components/TransactionForm';
import { 
  HiOutlineReceiptRefund, 
  HiOutlineShoppingBag, 
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePlus,
  HiOutlineDownload,
  HiOutlineCalendar
} from 'react-icons/hi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

// Sample transaction data
const SAMPLE_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Salary Deposit', amount: 2500.00, date: '2025-06-20', category: 'Salary', type: 'income', paymentMethod: 'Bank Transfer' },
  { id: '2', description: 'Grocery Shopping', amount: -85.50, date: '2025-06-19', category: 'Food', type: 'expense', paymentMethod: 'Credit Card' },
  { id: '3', description: 'Gas Station', amount: -45.00, date: '2025-06-18', category: 'Transport', type: 'expense', paymentMethod: 'Debit Card' },
  { id: '4', description: 'Electricity Bill', amount: -120.00, date: '2025-06-17', category: 'Bills', type: 'expense', paymentMethod: 'Auto Pay' },
  { id: '5', description: 'Coffee Shop', amount: -8.75, date: '2025-06-16', category: 'Food', type: 'expense', paymentMethod: 'Cash' },
  { id: '6', description: 'Online Shopping', amount: -156.99, date: '2025-06-15', category: 'Shopping', type: 'expense', paymentMethod: 'Credit Card' },
  { id: '7', description: 'Rent Payment', amount: -800.00, date: '2025-06-01', category: 'Rent', type: 'expense', paymentMethod: 'Bank Transfer' },
  { id: '8', description: 'Freelance Payment', amount: 450.00, date: '2025-06-14', category: 'Work', type: 'income', paymentMethod: 'PayPal' },
  { id: '9', description: 'Movie Tickets', amount: -24.00, date: '2025-06-13', category: 'Entertainment', type: 'expense', paymentMethod: 'Credit Card' },
  { id: '10', description: 'Internet Bill', amount: -55.00, date: '2025-06-12', category: 'Bills', type: 'expense', paymentMethod: 'Auto Pay' },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();

  // Get unique categories from transactions
  const categories = useMemo(() => {
    const cats = [...new Set(transactions.map(t => t.category))];
    return ['All', ...cats];
  }, [transactions]);

  // Filter transactions based on search and filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || transaction.category === selectedCategory;
      const matchesType = selectedType === 'All' || transaction.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [transactions, searchTerm, selectedCategory, selectedType]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const total = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const income = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = Math.abs(filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0));
    
    return { total, income, expenses, count: filteredTransactions.length };
  }, [filteredTransactions]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: (Date.now() + Math.random()).toString()
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const handleEditTransaction = (updatedTransaction: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;
    
    setTransactions(prev => 
      prev.map(t => 
        t.id === editingTransaction.id 
          ? { ...updatedTransaction, id: editingTransaction.id }
          : t
      )
    );
    setEditingTransaction(undefined);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const openEditForm = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTransaction(undefined);
  };

  return (
    <Layout title="Transactions" subtitle="View and manage all your transactions">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="theme-card theme-border border shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium theme-text-secondary">Total Balance</p>
                  <p className={`text-2xl font-bold ${summary.total >= 0 ? 'theme-amount-positive' : 'theme-amount-negative'}`}>
                    ${Math.abs(summary.total).toFixed(2)}
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <FaRegMoneyBillAlt className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="theme-card theme-border border shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium theme-text-secondary">Total Income</p>
                  <p className="text-2xl font-bold theme-amount-positive">${summary.income.toFixed(2)}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <HiOutlineReceiptRefund className="text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="theme-card theme-border border shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium theme-text-secondary">Total Expenses</p>
                  <p className="text-2xl font-bold theme-amount-negative">${summary.expenses.toFixed(2)}</p>
                </div>
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <HiOutlineShoppingBag className="text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="theme-card theme-border border shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium theme-text-secondary">Transactions</p>
                  <p className="text-2xl font-bold theme-text">{summary.count}</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <HiOutlineCalendar className="text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="theme-card theme-border border shadow-lg">
          <CardHeader>
            <CardTitle className="theme-text flex items-center gap-2">
              <HiOutlineFilter className="text-blue-500" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 theme-card theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 theme-text"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 theme-card theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 theme-text"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 theme-card theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 theme-text"
              >
                <option value="All">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowForm(true)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <HiOutlinePlus className="w-4 h-4" />
                  Add
                </button>
                <button className="px-4 py-2 theme-border border theme-card rounded-lg theme-text hover:opacity-80 transition-opacity">
                  <HiOutlineDownload className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="theme-card theme-border border shadow-lg">
          <CardHeader>
            <CardTitle className="theme-text flex items-center gap-2">
              <HiOutlineReceiptRefund className="text-blue-500" />
              All Transactions ({filteredTransactions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiOutlineReceiptRefund className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="theme-text-secondary text-lg">No transactions found</p>
                  <p className="theme-text-secondary text-sm">Try adjusting your search or filters</p>
                </div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    variant="default"
                    showActions={true}
                    onEdit={openEditForm}
                    onDelete={handleDeleteTransaction}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={showForm}
        onClose={closeForm}
        onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
        editingTransaction={editingTransaction}
      />
    </Layout>
  );
};

export default Transactions;