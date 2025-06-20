import React from "react";

type BudgetSummaryCardsProps = {
  totalSpent: number;
  remainingBudget: number;
  thisMonth: number;
};

const BudgetSummaryCards: React.FC<BudgetSummaryCardsProps> = ({
  totalSpent,
  remainingBudget,
  thisMonth,
}) => (
  <div className="mx-auto mt-1 max-w-full sm:max-w-7xl w-full">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Spent */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 flex items-center shadow-md hover:shadow-lg transition-shadow duration-200 group">
        <span className="h-10 w-2 rounded-lg bg-blue-400 mr-5"></span>
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-base font-medium mb-1">Total Spent</div>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">${totalSpent.toLocaleString()}</div>
        </div>
      </div>
      {/* Remaining Budget */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 flex items-center shadow-md hover:shadow-lg transition-shadow duration-200 group">
        <span className="h-10 w-2 rounded-lg bg-green-400 mr-5"></span>
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-base font-medium mb-1">Remaining Budget</div>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 group-hover:text-green-700 dark:group-hover:text-green-400 transition">${remainingBudget.toLocaleString()}</div>
        </div>
      </div>
      {/* This Month */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 flex items-center shadow-md hover:shadow-lg transition-shadow duration-200 group">
        <span className="h-10 w-2 rounded-lg bg-orange-400 mr-5"></span>
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-base font-medium mb-1">This Month</div>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 group-hover:text-orange-700 dark:group-hover:text-orange-400 transition">${thisMonth.toLocaleString()}</div>
        </div>
      </div>
    </div>
  </div>
);

export default BudgetSummaryCards;