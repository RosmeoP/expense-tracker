const DashboardOverview = () => {
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="p-6 flex-1 w-full max-w-7xl mx-auto">


        <h1 className="text-3xl font-extrabold mb-8 text-blue-800 tracking-tight drop-shadow-sm">
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Total Balance */}
          <div className="relative bg-white rounded-2xl shadow-xl border-t-4 border-blue-500 p-6 overflow-hidden group transition-transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute right-4 top-4 opacity-10 text-6xl pointer-events-none select-none">
              💰
            </div>
            <div className="text-gray-500 text-sm mb-2 font-medium">Total Balance</div>
            <div className="text-4xl font-bold text-blue-700 mb-2">$4,250.00</div>
            <div className="text-xs text-gray-400">Updated just now</div>
          </div>
          {/* Monthly Expenses */}
          <div className="relative bg-white rounded-2xl shadow-xl border-t-4 border-pink-500 p-6 overflow-hidden group transition-transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute right-4 top-4 opacity-10 text-6xl pointer-events-none select-none">
              🛒
            </div>
            <div className="text-gray-500 text-sm mb-2 font-medium">This Month's Expenses</div>
            <div className="text-4xl font-bold text-pink-600 mb-2">$1,200.00</div>
            <div className="text-xs text-gray-400">+8% from last month</div>
          </div>
          {/* Budget Used */}
          <div className="relative bg-white rounded-2xl shadow-xl border-t-4 border-green-500 p-6 overflow-hidden group transition-transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute right-4 top-4 opacity-10 text-6xl pointer-events-none select-none">
              📊
            </div>
            <div className="text-gray-500 text-sm mb-2 font-medium">Budget Used</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-4xl font-bold text-green-600">72%</div>
              <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: '72%' }} />
              </div>
            </div>
            <div className="text-xs text-gray-400">Keep it under 80%!</div>
          </div>
        </div>

        {/* Extra Widgets */}
       

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-xl font-semibold text-blue-700 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Transactions
            </div>
            <button className="text-blue-600 hover:text-blue-800 font-medium transition">View All</button>
          </div>
          <ul className="divide-y divide-gray-100">
            <li className="py-4 flex items-center justify-between group hover:bg-blue-50 rounded-lg px-2 transition">
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 rounded-full p-2 text-lg">🛒</span>
                <span className="text-gray-700 font-medium">Groceries</span>
              </div>
              <span className="text-red-500 font-semibold">- $120.00</span>
            </li>
            <li className="py-4 flex items-center justify-between group hover:bg-blue-50 rounded-lg px-2 transition">
              <div className="flex items-center gap-3">
                <span className="bg-green-100 text-green-600 rounded-full p-2 text-lg">💼</span>
                <span className="text-gray-700 font-medium">Salary</span>
              </div>
              <span className="text-green-500 font-semibold">+ $2,000.00</span>
            </li>
            <li className="py-4 flex items-center justify-between group hover:bg-blue-50 rounded-lg px-2 transition">
              <div className="flex items-center gap-3">
                <span className="bg-yellow-100 text-yellow-600 rounded-full p-2 text-lg">💡</span>
                <span className="text-gray-700 font-medium">Utilities</span>
              </div>
              <span className="text-red-500 font-semibold">- $80.00</span>
            </li>
            <li className="py-4 flex items-center justify-between group hover:bg-blue-50 rounded-lg px-2 transition">
              <div className="flex items-center gap-3">
                <span className="bg-purple-100 text-purple-600 rounded-full p-2 text-lg">🚗</span>
                <span className="text-gray-700 font-medium">Transport</span>
              </div>
              <span className="text-red-500 font-semibold">- $45.00</span>
            </li>
            <li className="py-4 flex items-center justify-between group hover:bg-blue-50 rounded-lg px-2 transition">
              <div className="flex items-center gap-3">
                <span className="bg-pink-100 text-pink-600 rounded-full p-2 text-lg">🍽️</span>
                <span className="text-gray-700 font-medium">Dining Out</span>
              </div>
              <span className="text-red-500 font-semibold">- $60.00</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;