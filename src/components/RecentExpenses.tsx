import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag, HiOutlineHome, HiOutlineCake, HiOutlineFastForward, HiOutlineCreditCard } from "react-icons/hi";
import { FaRegMoneyBillAlt } from "react-icons/fa";

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
};

type RecentExpensesProps = {
  expenses: Expense[];
  maxHeight?: string;
};

const CATEGORY_META: Record<
  string,
  { icon: React.ReactNode; color: string; tagColor: string }
> = {
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
  Other: {
    icon: <FaRegMoneyBillAlt className="text-gray-500" />,
    color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
    tagColor: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
  },
};

const getCategoryMeta = (category: string) =>
  CATEGORY_META[category] || CATEGORY_META["Other"];

const RecentExpenses: React.FC<RecentExpensesProps> = ({
  expenses,
  maxHeight = "240px",
}) => (
  <Card className="w-full h-[355px] theme-border border shadow-lg">
    <CardHeader className="pb-0 theme-gradient rounded-t-xl shadow-sm">
      <CardTitle className="text-base font-semibold flex items-center gap-2 theme-amount-primary">
        <HiOutlineReceiptRefund className="text-blue-500 text-xl" />
        Recent Expenses
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-2">
      <div
        className="overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200"
        style={{ maxHeight }}
      >
        {expenses.length === 0 ? (
          <div className="px-4 py-8 theme-text-secondary text-center">No recent expenses.</div>
        ) : (
          <ul className="flex flex-col gap-2">
            {expenses.map((exp) => {
              const meta = getCategoryMeta(exp.category);
              return (
                <li
                  key={exp.id}
                  className="flex items-center justify-between theme-list-item rounded-lg px-3 py-2 shadow-sm theme-border border transition-all duration-150"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar with icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${meta.color} shadow-sm`}>
                      {meta.icon}
                    </div>
                    <div>
                      <div className="font-medium theme-text text-[15px] flex items-center gap-2">
                        {exp.description}
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${meta.tagColor}`}>
                          {exp.category}
                        </span>
                      </div>
                      <div className="text-xs theme-text-secondary">{exp.date}</div>
                    </div>
                  </div>
                  <div className="font-bold theme-amount-primary text-[15px]">${exp.amount.toFixed(2)}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </CardContent>
  </Card>
);

export default RecentExpenses;