const DashboardOverview = () => {
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="p-6 flex-1 w-full max-w-7xl mx-auto">

        <h1 className="text-3xl font-extrabold mb-8 theme-text tracking-tight drop-shadow-sm">
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Total Balance */}
          <div className="relative theme-card rounded-2xl shadow-xl border-t-4 border-blue-500 p-6 overflow-hidden group theme-hover">
            <div className="absolute right-4 top-4 opacity-10 text-6xl pointer-events-none select-none">
              💰
            </div>
            <div className="theme-text-secondary text-sm mb-2 font-medium">Total Balance</div>
            <div className="text-4xl font-bold theme-amount-primary mb-2">$4,250.00</div>
            <div className="text-xs theme-text-secondary opacity-70">Updated just now</div>
          </div>
          {/* Monthly Expenses */}
          <div className="relative theme-card rounded-2xl shadow-xl border-t-4 border-pink-500 p-6 overflow-hidden group theme-hover">
            <div className="absolute right-4 top-4 opacity-10 text-6xl pointer-events-none select-none">
              🛒
            </div>
            <div className="theme-text-secondary text-sm mb-2 font-medium">This Month's Expenses</div>
            <div className="text-4xl font-bold theme-amount-negative mb-2">$1,200.00</div>
            <div className="text-xs theme-text-secondary opacity-70">+8% from last month</div>
          </div>
          {/* Budget Used */}
          <div className="relative theme-card rounded-2xl shadow-xl border-t-4 border-green-500 p-6 overflow-hidden group theme-hover">
            <div className="absolute right-4 top-4 opacity-10 text-6xl pointer-events-none select-none">
              📊
            </div>
            <div className="theme-text-secondary text-sm mb-2 font-medium">Budget Used</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-4xl font-bold theme-amount-positive">72%</div>
              <div className="w-24 h-3 theme-progress-bg rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: '72%' }} />
              </div>
            </div>
            <div className="text-xs theme-text-secondary opacity-70">Keep it under 80%!</div>
          </div>
        </div>

        {/* Extra Widgets */}
       

        {/* Recent Transactions */}
        <div className="theme-card rounded-2xl shadow-xl theme-border border p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-xl font-semibold theme-text flex items-center gap-2">
              <svg className="w-6 h-6 theme-amount-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Transactions
            </div>
            <button className="theme-amount-primary hover:opacity-80 font-medium transition">View All</button>
          </div>
          <ul className="divide-y theme-border">
            <li className="py-4 flex items-center justify-between group theme-list-item rounded-lg px-2 transition">
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full p-2 text-lg">🛒</span>
                <span className="theme-text font-medium">Groceries</span>
              </div>
              <span className="theme-amount-negative font-semibold">- $120.00</span>
            </li>
            <li className="py-4 flex items-center justify-between group theme-list-item rounded-lg px-2 transition">
              <div className="flex items-center gap-3">
                <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full p-2 text-lg">💼</span>
                <span className="theme-text font-medium">Salary</span>
              </div>
              <span className="theme-amount-positive font-semibold">+ $2,000.00</span>
            </li>
            <li className="py-4 flex items-center justify-between group theme-list-item rounded-lg px-2 transition">
              <div className="flex items-center gap-3">
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 rounded-full p-2 text-lg">💡</span>
                <span className="theme-text font-medium">Utilities</span>
              </div>
              <span className="theme-amount-negative font-semibold">- $80.00</span>
            </li>
            <li className="py-4 flex items-center justify-between group theme-list-item rounded-lg px-2 transition">
              <div className="flex items-center gap-3">
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full p-2 text-lg">🚗</span>
                <span className="theme-text font-medium">Transport</span>
              </div>
              <span className="theme-amount-negative font-semibold">- $45.00</span>
            </li>
            <li className="py-4 flex items-center justify-between group theme-list-item rounded-lg px-2 transition">
              <div className="flex items-center gap-3">
                <span className="bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 rounded-full p-2 text-lg">🍽️</span>
                <span className="theme-text font-medium">Dining Out</span>
              </div>
              <span className="theme-amount-negative font-semibold">- $60.00</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;