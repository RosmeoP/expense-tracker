import React from 'react';
import { 
  HiOutlineShoppingBag, 
  HiOutlineHome, 
  HiOutlineCake, 
  HiOutlineFastForward, 
  HiOutlineCreditCard,
  HiOutlineDotsVertical,
  HiOutlinePencil,
  HiOutlineTrash
} from 'react-icons/hi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

// Transaction type definition
export type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
  paymentMethod?: string;
  tags?: string[];
  note?: string;
  location?: string;
};

// Category metadata
const CATEGORY_META: Record<string, { icon: React.ReactNode; color: string; tagColor: string }> = {
  Food: {
    icon: <HiOutlineFastForward className="text-orange-500" />,
    color: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
    tagColor: "bg-orange-200 dark:bg-orange-800 text-orange-700 dark:text-orange-300",
  },
  Shopping: {
    icon: <HiOutlineShoppingBag className="text-pink-500" />,
    color: "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300",
    tagColor: "bg-pink-200 dark:bg-pink-800 text-pink-700 dark:text-pink-300",
  },
  Transport: {
    icon: <HiOutlineCake className="text-blue-500" />,
    color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    tagColor: "bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300",
  },
  Bills: {
    icon: <HiOutlineCreditCard className="text-green-500" />,
    color: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    tagColor: "bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300",
  },
  Rent: {
    icon: <HiOutlineHome className="text-purple-500" />,
    color: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
    tagColor: "bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300",
  },
  Salary: {
    icon: <FaRegMoneyBillAlt className="text-green-600" />,
    color: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    tagColor: "bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300",
  },
  Work: {
    icon: <FaRegMoneyBillAlt className="text-blue-600" />,
    color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    tagColor: "bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300",
  },
  Entertainment: {
    icon: <HiOutlineCake className="text-indigo-500" />,
    color: "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300",
    tagColor: "bg-indigo-200 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300",
  },
  Other: {
    icon: <FaRegMoneyBillAlt className="text-gray-500" />,
    color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
    tagColor: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
  },
};

const getCategoryMeta = (category: string) => CATEGORY_META[category] || CATEGORY_META["Other"];

type TransactionCardProps = {
  transaction: Transaction;
  variant?: 'default' | 'compact' | 'detailed';
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
};

const TransactionCard: React.FC<TransactionCardProps> = ({ 
  transaction, 
  variant = 'default',
  onEdit,
  onDelete,
  showActions = false
}) => {
  const meta = getCategoryMeta(transaction.category);
  const [showMenu, setShowMenu] = React.useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const formatAmount = (amount: number, type: 'income' | 'expense') => {
    const absAmount = Math.abs(amount);
    const sign = type === 'income' ? '+' : '-';
    return `${sign}$${absAmount.toFixed(2)}`;
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between theme-list-item rounded-lg px-3 py-2 shadow-sm theme-border border transition-all duration-150 hover:shadow-md">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${meta.color}`}>
            {meta.icon}
          </div>
          <div>
            <div className="font-medium theme-text text-sm">{transaction.description}</div>
            <div className="text-xs theme-text-secondary">{formatDate(transaction.date)}</div>
          </div>
        </div>
        <div className={`font-bold text-sm ${
          transaction.type === 'income' ? 'theme-amount-positive' : 'theme-amount-negative'
        }`}>
          {formatAmount(transaction.amount, transaction.type)}
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className="theme-card rounded-xl theme-border border p-6 shadow-lg theme-hover">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${meta.color} shadow-sm`}>
              {meta.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold theme-text mb-1">{transaction.description}</h3>
              <div className="flex items-center gap-3 text-sm theme-text-secondary">
                <span>{formatDate(transaction.date)}</span>
                {transaction.paymentMethod && (
                  <>
                    <span>•</span>
                    <span>{transaction.paymentMethod}</span>
                  </>
                )}
                {transaction.location && (
                  <>
                    <span>•</span>
                    <span>{transaction.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`text-2xl font-bold ${
              transaction.type === 'income' ? 'theme-amount-positive' : 'theme-amount-negative'
            }`}>
              {formatAmount(transaction.amount, transaction.type)}
            </div>
            {showActions && (
              <div className="relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 theme-text-secondary hover:theme-text rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <HiOutlineDotsVertical className="w-4 h-4" />
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-full mt-1 w-32 theme-card theme-border border rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        onEdit?.(transaction);
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm theme-text hover:bg-gray-50 dark:hover:bg-gray-800 rounded-t-lg transition-colors flex items-center gap-2"
                    >
                      <HiOutlinePencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDelete?.(transaction.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-lg transition-colors flex items-center gap-2"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${meta.tagColor}`}>
            {transaction.category}
          </span>
          {transaction.type === 'income' && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
              Income
            </span>
          )}
          {transaction.tags?.map(tag => (
            <span key={tag} className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
              #{tag}
            </span>
          ))}
        </div>

        {transaction.note && (
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-sm theme-text-secondary">{transaction.note}</p>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex items-center justify-between theme-list-item rounded-lg px-4 py-3 shadow-sm theme-border border transition-all duration-150 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${meta.color} shadow-sm`}>
          {meta.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold theme-text">{transaction.description}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${meta.tagColor}`}>
              {transaction.category}
            </span>
            {transaction.type === 'income' && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                Income
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm theme-text-secondary">
            <span>{formatDate(transaction.date)}</span>
            {transaction.paymentMethod && (
              <>
                <span>•</span>
                <span>{transaction.paymentMethod}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className={`text-lg font-bold ${
          transaction.type === 'income' ? 'theme-amount-positive' : 'theme-amount-negative'
        }`}>
          {formatAmount(transaction.amount, transaction.type)}
        </div>
        <div className="text-xs theme-text-secondary">
          {transaction.type === 'income' ? 'Received' : 'Spent'}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
