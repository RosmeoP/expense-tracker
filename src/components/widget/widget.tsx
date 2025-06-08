import { TrendingUp, TrendingDown, Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

// Large Widget: Balance
export const WidgetBalance = ({ value, trend }: { value: string; trend: number }) => (
  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl shadow-2xl min-w-[340px] min-h-[200px] p-8 flex flex-col justify-between relative">
    <div className="flex items-center gap-3 mb-2">
      <Wallet className="w-10 h-10 opacity-40" />
      <span className="text-2xl font-bold">Balance</span>
    </div>
    <div className="text-indigo-100 text-sm mb-4">Total available</div>
    <div className="text-5xl font-extrabold mb-2">{value}</div>
    <div className="flex items-center gap-2">
      {trend >= 0 ? (
        <TrendingUp className="w-6 h-6 text-green-200" />
      ) : (
        <TrendingDown className="w-6 h-6 text-red-200" />
      )}
      <span className={`text-lg ${trend >= 0 ? "text-green-100" : "text-red-100"}`}>
        {trend >= 0 ? "+" : ""}
        {trend}%
      </span>
      <span className="text-sm text-indigo-100 ml-2">vs last month</span>
    </div>
  </div>
);

// Medium Widget: Expenses
export const WidgetExpenses = ({ value, subtitle }: { value: string; subtitle: string }) => (
  <div className="rounded-2xl bg-white shadow-lg min-w-[220px] min-h-[140px] border-l-8 border-red-400 p-6 flex flex-col justify-between">
    <div className="flex items-center gap-2 text-red-500 text-lg font-semibold mb-2">
      <ArrowDownCircle className="w-5 h-5" />
      Expenses
    </div>
    <div className="text-gray-400 text-sm mb-1">{subtitle}</div>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
    {/* Progress bar example */}
    <div className="w-full bg-red-100 rounded-full h-2 mt-3">
      <div className="bg-red-400 h-2 rounded-full" style={{ width: "60%" }} />
    </div>
    <div className="text-xs text-gray-400 mt-1">60% of budget used</div>
  </div>
);

// Small Widget: Income
export const WidgetIncome = ({ value }: { value: string }) => (
  <div className="rounded-xl bg-green-50 border border-green-400 min-w-[140px] min-h-[90px] shadow p-4 flex flex-col justify-between">
    <div className="flex items-center gap-2 text-green-700 text-base font-semibold mb-1">
      <ArrowUpCircle className="w-4 h-4" />
      Income
    </div>
    <div className="text-2xl font-bold text-green-900">{value}</div>
  </div>
);