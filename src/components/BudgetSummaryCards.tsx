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
      <div className="theme-card rounded-2xl theme-border border p-6 flex items-center shadow-md theme-hover">
        <span className="h-10 w-2 rounded-lg bg-blue-400 mr-5"></span>
        <div>
          <div className="theme-text-secondary text-base font-medium mb-1">Total Spent</div>
          <div className="text-2xl font-extrabold theme-text group-hover:theme-amount-primary transition">${totalSpent.toLocaleString()}</div>
        </div>
      </div>
      {/* Remaining Budget */}
      <div className="theme-card rounded-2xl theme-border border p-6 flex items-center shadow-md theme-hover">
        <span className="h-10 w-2 rounded-lg bg-green-400 mr-5"></span>
        <div>
          <div className="theme-text-secondary text-base font-medium mb-1">Remaining Budget</div>
          <div className="text-2xl font-extrabold theme-text group-hover:theme-amount-positive transition">${remainingBudget.toLocaleString()}</div>
        </div>
      </div>
      {/* This Month */}
      <div className="theme-card rounded-2xl theme-border border p-6 flex items-center shadow-md theme-hover">
        <span className="h-10 w-2 rounded-lg bg-orange-400 mr-5"></span>
        <div>
          <div className="theme-text-secondary text-base font-medium mb-1">This Month</div>
          <div className="text-2xl font-extrabold theme-text group-hover:text-orange-700 transition">${thisMonth.toLocaleString()}</div>
        </div>
      </div>
    </div>
  </div>
);

export default BudgetSummaryCards;