import React from 'react';
import { FiGrid, FiTrendingUp, FiPieChart, FiCalendar, FiAlertCircle } from 'react-icons/fi';

type NextBill = {
  name: string;
  amount: number;
  dueDate: string;
  daysLeft: number;
};

type FinancialOverviewProps = {
  savingsRate: number;
  budgetHealth: number;
  nextBill?: NextBill;
  alerts?: string[];
  growth?: number;
  onViewReports?: () => void;
  onAddExpense?: () => void;
};

const FinancialOverview: React.FC<FinancialOverviewProps> = ({
  savingsRate,
  budgetHealth,
  nextBill,
  alerts = [],
  growth = 0,
  onViewReports,
  onAddExpense,
}) => (
  <section className="mx-auto my-4 theme-gradient rounded-xl shadow-lg p-3 sm:p-4 flex items-start gap-4 theme-border border max-w-full sm:max-w-7xl">
    {/* Left Icon */}
    <div className="hidden xs:flex flex-col items-center justify-center mr-4 mt-2">
      <FiGrid className="text-3xl theme-text-secondary" />
    </div>
    {/* Main Content */}
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold theme-text flex items-center gap-2">Financial Overview</h2>
          <p className="theme-text-secondary text-base sm:text-lg">Your spending insights at a glance</p>
        </div>
        {/* Growth */}
        <div className="flex flex-col items-end ml-4">
          <span className="theme-amount-positive font-bold text-xl sm:text-2xl">
            {growth > 0 && '+'}{growth}%
          </span>
          <span className="text-sm theme-text-secondary">vs last month</span>
        </div>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8">
        {/* Savings Rate */}
        <div className="theme-card rounded-xl theme-border border p-4 shadow theme-hover">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-green-100 dark:bg-green-900 rounded-full p-2">
              <FiTrendingUp className="text-2xl text-green-600 dark:text-green-400" />
            </span>
            <span className="text-sm font-semibold theme-text">Savings Rate</span>
          </div>
          <hr className="theme-border mb-2" />
          <span className="text-2xl font-extrabold theme-amount-positive transition">{savingsRate}%</span>
        </div>
        {/* Budget Health */}
        <div className="theme-card rounded-xl theme-border border p-4 shadow theme-hover">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-100 dark:bg-blue-900 rounded-full p-2">
              <FiPieChart className="text-2xl text-blue-600 dark:text-blue-400" />
            </span>
            <span className="text-sm font-semibold theme-text">Budget Health</span>
          </div>
          <hr className="theme-border mb-2" />
          <span className="text-2xl font-extrabold theme-amount-primary transition">{budgetHealth}%</span>
        </div>
        {/* Next Bill */}
        <div className="theme-card rounded-xl theme-border border p-4 shadow theme-hover">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-orange-100 dark:bg-orange-900 rounded-full p-2">
              <FiCalendar className="text-2xl text-orange-600 dark:text-orange-400" />
            </span>
            <span className="text-sm font-semibold theme-text">Next Bill</span>
          </div>
          <hr className="theme-border mb-2" />
          <span className="text-2xl font-extrabold text-orange-600 dark:text-orange-400 transition">
            {nextBill ? `${nextBill.daysLeft} days` : '--'}
          </span>
        </div>
        {/* Alerts */}
        <div className="theme-card rounded-xl theme-border border p-4 shadow theme-hover">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-red-100 dark:bg-red-900 rounded-full p-2">
              <FiAlertCircle className="text-2xl text-red-500 dark:text-red-400" />
            </span>
            <span className="text-sm font-semibold theme-text">Alerts</span>
          </div>
          <hr className="theme-border mb-2" />
          <span className="text-2xl font-extrabold theme-amount-negative transition">{alerts.length}</span>
        </div>
      </div>
      {/* Status and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-3">
        {/* Status */}
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>
          <span className="text-base sm:text-lg theme-text font-medium">All budgets on track</span>
        </div>
        {/* Actions */}
        <div className="flex gap-3 mt-3 sm:mt-0">
          <button
            onClick={onViewReports}
            className="theme-card theme-border border theme-text px-5 py-2 rounded-lg text-base sm:text-lg font-medium hover:opacity-80 transition"
          >
            View Reports
          </button>
          <button
            onClick={onAddExpense}
            className="bg-gray-900 dark:bg-gray-700 text-white px-5 py-2 rounded-lg text-base sm:text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default FinancialOverview;