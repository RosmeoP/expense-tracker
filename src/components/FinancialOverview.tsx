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
  <section className="mx-auto my-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-lg p-6 sm:p-10 flex items-start gap-6 border border-gray-200 max-w-full sm:max-w-7xl">
    {/* Left Icon */}
    <div className="hidden xs:flex flex-col items-center justify-center mr-4 mt-2">
      <FiGrid className="text-3xl text-gray-500" />
    </div>
    {/* Main Content */}
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">Financial Overview</h2>
          <p className="text-gray-500 text-base sm:text-lg">Your spending insights at a glance</p>
        </div>
        {/* Growth */}
        <div className="flex flex-col items-end ml-4">
          <span className="text-green-600 font-bold text-xl sm:text-2xl">
            {growth > 0 && '+'}{growth}%
          </span>
          <span className="text-sm text-gray-400">vs last month</span>
        </div>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8">
        {/* Savings Rate */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 flex flex-col gap-2 shadow-md">
          <div className="flex items-center gap-2 text-green-600">
            <FiTrendingUp className="text-xl" />
            <span className="text-sm font-medium">Savings Rate</span>
          </div>
          <span className="text-2xl font-bold text-green-700">{savingsRate}%</span>
        </div>
        {/* Budget Health */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 flex flex-col gap-2 shadow-md">
          <div className="flex items-center gap-2 text-blue-600">
            <FiPieChart className="text-xl" />
            <span className="text-sm font-medium">Budget Health</span>
          </div>
          <span className="text-2xl font-bold text-blue-700">{budgetHealth}%</span>
        </div>
        {/* Next Bill */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 flex flex-col gap-2 shadow-md">
          <div className="flex items-center gap-2 text-orange-600">
            <FiCalendar className="text-xl" />
            <span className="text-sm font-medium">Next Bill</span>
          </div>
          <span className="text-2xl font-bold text-orange-700">
            {nextBill ? `${nextBill.daysLeft} days` : '--'}
          </span>
        </div>
        {/* Alerts */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 flex flex-col gap-2 shadow-md">
          <div className="flex items-center gap-2 text-red-500">
            <FiAlertCircle className="text-xl" />
            <span className="text-sm font-medium">Alerts</span>
          </div>
          <span className="text-2xl font-bold text-red-600">{alerts.length}</span>
        </div>
      </div>
      {/* Status and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-3">
        {/* Status */}
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>
          <span className="text-base sm:text-lg text-gray-700 font-medium">All budgets on track</span>
        </div>
        {/* Actions */}
        <div className="flex gap-3 mt-3 sm:mt-0">
          <button
            onClick={onViewReports}
            className="bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded-lg text-base sm:text-lg font-medium hover:bg-gray-100 transition"
          >
            View Reports
          </button>
          <button
            onClick={onAddExpense}
            className="bg-gray-900 text-white px-5 py-2 rounded-lg text-base sm:text-lg font-medium hover:bg-gray-800 transition"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default FinancialOverview;