import { TrendingUp, TrendingDown, Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

// Large Widget: Balance (compact)
export const WidgetBalance = ({ value, trend }: { value: string; trend: number }) => (
  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg min-w-[140px] max-w-[220px] min-h-[90px] max-h-[140px] p-3 flex flex-col justify-between w-full">
    <div className="flex items-center gap-2 mb-1">
      <Wallet className="w-6 h-6 opacity-40" />
      <span className="text-base font-bold">Balance</span>
    </div>
    <div className="text-indigo-100 text-xs mb-1">Total available</div>
    <div className="text-2xl font-extrabold mb-1">{value}</div>
    <div className="flex items-center gap-1">
      {trend >= 0 ? (
        <TrendingUp className="w-4 h-4 text-green-200" />
      ) : (
        <TrendingDown className="w-4 h-4 text-red-200" />
      )}
      <span className={`text-xs ${trend >= 0 ? "text-green-100" : "text-red-100"}`}>
        {trend >= 0 ? "+" : ""}
        {trend}%
      </span>
      <span className="text-xs text-indigo-100 ml-1">vs last month</span>
    </div>
  </div>
);

// Medium Widget: Expenses (compact)
export const WidgetExpenses = ({ value, subtitle }: { value: string; subtitle: string }) => (
  <div className="rounded-xl bg-white shadow min-w-[110px] max-w-[180px] min-h-[70px] max-h-[110px] border-l-4 border-red-400 p-3 flex flex-col justify-between w-full">
    <div className="flex items-center gap-1 text-red-500 text-sm font-semibold mb-1">
      <ArrowDownCircle className="w-4 h-4" />
      Expenses
    </div>
    <div className="text-gray-400 text-xs mb-1">{subtitle}</div>
    <div className="text-lg font-bold text-gray-900">{value}</div>
    {/* Progress bar example */}
    <div className="w-full bg-red-100 rounded-full h-1 mt-1">
      <div className="bg-red-400 h-1 rounded-full" style={{ width: "60%" }} />
    </div>
    <div className="text-xs text-gray-400 mt-1">60% of budget used</div>
  </div>
);

// Small Widget: Income (compact)
export const WidgetIncome = ({ value }: { value: string }) => (
  <div className="rounded-lg bg-green-50 border border-green-400 min-w-[80px] max-w-[120px] min-h-[50px] max-h-[80px] shadow p-2 flex flex-col justify-between w-full">
    <div className="flex items-center gap-1 text-green-700 text-xs font-semibold mb-1">
      <ArrowUpCircle className="w-3 h-3" />
      Income
    </div>
    <div className="text-lg font-bold text-green-900">{value}</div>
  </div>
);