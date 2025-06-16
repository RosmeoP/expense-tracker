import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { HiOutlineReceiptRefund } from "react-icons/hi";

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
};

type RecentExpensesProps = {
  expenses: Expense[];
  maxHeight?: string; // e.g. "320px"
};

const RecentExpenses: React.FC<RecentExpensesProps> = ({
  expenses,
  maxHeight = "213px", // Match chart height
}) => (
  <Card className="w-full max-w-full sm:max-w-md mt-2 mb-8 border border-gray-200 mx-auto">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-semibold flex items-center gap-2">
        <HiOutlineReceiptRefund className="text-blue-500 text-lg" />
        Recent Expenses
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-0">
      <div
        className="overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200"
        style={{ maxHeight }}
      >
        {expenses.length === 0 ? (
          <div className="px-4 py-6 text-gray-400 text-center">No recent expenses.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {expenses.map(exp => (
              <li
                key={exp.id}
                className="flex justify-between items-center px-2 py-2 hover:bg-slate-50 transition-colors rounded"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-400" />
                  <div>
                    <div className="font-medium text-gray-700 text-[15px]">{exp.description}</div>
                    <div className="text-xs text-gray-400">{exp.date}</div>
                  </div>
                </div>
                <div className="font-semibold text-blue-600 text-[15px]">${exp.amount.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </CardContent>
  </Card>
);

export default RecentExpenses;