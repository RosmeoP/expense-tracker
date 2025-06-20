import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { HiOutlineX, HiOutlinePlus, HiOutlineCheck } from 'react-icons/hi';
import type { Transaction } from './TransactionCard';

type TransactionFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  editingTransaction?: Transaction;
  title?: string;
};

const CATEGORIES = [
  'Food', 'Shopping', 'Transport', 'Bills', 'Rent', 'Salary', 
  'Work', 'Entertainment', 'Healthcare', 'Education', 'Travel', 'Other'
];

const PAYMENT_METHODS = [
  'Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'PayPal', 
  'Venmo', 'Apple Pay', 'Google Pay', 'Auto Pay', 'Check'
];

const TransactionForm: React.FC<TransactionFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingTransaction,
  title
}) => {
  const [formData, setFormData] = useState({
    description: editingTransaction?.description || '',
    amount: editingTransaction ? Math.abs(editingTransaction.amount).toString() : '',
    date: editingTransaction?.date || new Date().toISOString().split('T')[0],
    category: editingTransaction?.category || 'Other',
    type: editingTransaction?.type || 'expense' as 'income' | 'expense',
    paymentMethod: editingTransaction?.paymentMethod || 'Cash',
    note: editingTransaction?.note || '',
    location: editingTransaction?.location || '',
    tags: editingTransaction?.tags?.join(', ') || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const amount = Number(formData.amount);
    const transactionData: Omit<Transaction, 'id'> = {
      description: formData.description.trim(),
      amount: formData.type === 'expense' ? -amount : amount,
      date: formData.date,
      category: formData.category,
      type: formData.type,
      paymentMethod: formData.paymentMethod,
      note: formData.note.trim() || undefined,
      location: formData.location.trim() || undefined,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : undefined
    };

    onSubmit(transactionData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto theme-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="theme-text flex items-center gap-2">
            <HiOutlinePlus className="text-blue-500" />
            {title || (editingTransaction ? 'Edit Transaction' : 'Add New Transaction')}
          </CardTitle>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <HiOutlineX className="w-5 h-5 theme-text-secondary" />
          </button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium theme-text mb-2">Transaction Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'expense')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.type === 'expense'
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      : 'theme-border border theme-card hover:border-red-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">💸</div>
                    <div className="font-medium">Expense</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'income')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.type === 'income'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                      : 'theme-border border theme-card hover:border-green-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">💰</div>
                    <div className="font-medium">Income</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Description and Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium theme-text mb-2">
                  Description *
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="e.g., Grocery shopping"
                  className={`w-full px-3 py-2 theme-card theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 theme-text ${
                    errors.description ? 'border-red-500' : ''
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium theme-text mb-2">
                  Amount * ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="0.00"
                  className={`w-full px-3 py-2 theme-card theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 theme-text ${
                    errors.amount ? 'border-red-500' : ''
                  }`}
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </div>
            </div>

            {/* Date and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium theme-text mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={`w-full px-3 py-2 theme-card theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 theme-text ${
                    errors.date ? 'border-red-500' : ''
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium theme-text mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 theme-card theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 theme-text"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payment Method and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium theme-text mb-2">
                  Payment Method
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  className="w-full px-3 py-2 theme-card theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 theme-text"
                >
                  {PAYMENT_METHODS.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium theme-text mb-2">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Walmart, Online"
                  className="w-full px-3 py-2 theme-card theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 theme-text"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium theme-text mb-2">
                Tags (Optional)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="e.g., urgent, work, personal (comma separated)"
                className="w-full px-3 py-2 theme-card theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 theme-text"
              />
              <p className="text-xs theme-text-secondary mt-1">Separate multiple tags with commas</p>
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium theme-text mb-2">
                Note (Optional)
              </label>
              <textarea
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                placeholder="Add any additional details..."
                rows={3}
                className="w-full px-3 py-2 theme-card theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 theme-text resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 theme-border border theme-card rounded-lg theme-text hover:opacity-80 transition-opacity"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <HiOutlineCheck className="w-4 h-4" />
                {editingTransaction ? 'Update' : 'Add'} Transaction
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForm;
