import React from "react";

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
};

type RecentExpensesProps = {
  expenses: Expense[];
  maxHeight?: string; // e.g. "200px"
};

const RecentExpenses: React.FC<RecentExpensesProps> = ({
  expenses,
  maxHeight = "240px",
}) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow p-0 flex flex-col w-full max-w-md">
    {/* Fixed label/header */}
    <div className="sticky top-0 bg-white z-10 border-b px-4 py-3 rounded-t-xl">
      <span className="font-semibold text-gray-800 text-base">Recent Expenses</span>
    </div>
    {/* Scrollable list */}
    <div
      className="overflow-y-auto"
      style={{ maxHeight }}
    >
      {expenses.length === 0 ? (
        <div className="px-4 py-6 text-gray-400 text-center">No recent expenses.</div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {expenses.map(exp => (
            <li key={exp.id} className="flex justify-between items-center px-4 py-3">
              <div>
                <div className="font-medium text-gray-700">{exp.description}</div>
                <div className="text-xs text-gray-400">{exp.date}</div>
              </div>
              <div className="font-semibold text-blue-600">${exp.amount.toFixed(2)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default RecentExpenses;