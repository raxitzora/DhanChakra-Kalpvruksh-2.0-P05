import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Liquidity */}
                <div className="bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="text-blue-100 font-medium mb-1">Total Available Liquidity</h3>
                    <div className="text-4xl font-bold mb-2">₹14,500</div>
                    <p className="text-sm text-blue-200">Ready to spend immediately</p>
                </div>
                
                {/* Cash in Hand */}
                <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
                    <h3 className="text-gray-500 font-medium mb-1">Actual Cash in Drawer</h3>
                    <div className="text-3xl font-bold text-gray-800 mb-2">₹4,500</div>
                    <div className="flex items-center text-sm text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                        Physically available
                    </div>
                </div>

                {/* Pending Digital Settlements */}
                <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
                    <h3 className="text-gray-500 font-medium mb-1">Pending Digital Settlements</h3>
                    <div className="text-3xl font-bold text-gray-800 mb-2">₹10,000</div>
                    <div className="flex items-center text-sm text-yellow-500">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                        Will settle tomorrow
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <button className="flex-1 min-w-50 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl p-4 font-semibold hover:bg-emerald-100 transition shadow-sm text-center">
                        + Log Cash Sale
                    </button>
                    <button className="flex-1 min-w-50 bg-red-50 text-red-700 border border-red-200 rounded-xl p-4 font-semibold hover:bg-red-100 transition shadow-sm text-center">
                        - Log Expense (Shop)
                    </button>
                    <button className="flex-1 min-w-50 bg-purple-50 text-purple-700 border border-purple-200 rounded-xl p-4 font-semibold hover:bg-purple-100 transition shadow-sm text-center">
                        💳 Supplier Payment
                    </button>
                    <button className="flex-1 min-w-50 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl p-4 font-semibold hover:bg-orange-100 transition shadow-sm text-center">
                        🏠 Personal Withdrawal
                    </button>
                </div>
            </div>

            {/* Mini Ledger */}
            <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
                    <Link to="/transactions" className="text-blue-600 font-medium hover:underline text-sm">View Full Ledger &rarr;</Link>
                </div>
                <div className="p-0">
                    <table className="w-full text-left border-collapse">
                        <tbody>
                            <tr className="border-b border-gray-50 hover:bg-gray-50 transition">
                                <td className="p-4 text-sm font-medium text-gray-800">Customer Sale</td>
                                <td className="p-4 text-sm text-emerald-600 font-bold">+₹500</td>
                                <td className="p-4"><span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800 font-medium">Cash</span></td>
                                <td className="p-4 text-xs text-gray-400">Just now</td>
                            </tr>
                            <tr className="border-b border-gray-50 hover:bg-gray-50 transition">
                                <td className="p-4 text-sm font-medium text-gray-800">Customer Sale</td>
                                <td className="p-4 text-sm text-emerald-600 font-bold">+₹1,200</td>
                                <td className="p-4"><span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-medium">UPI</span></td>
                                <td className="p-4 text-xs text-gray-400">2 hours ago</td>
                            </tr>
                            <tr className="border-b border-gray-50 hover:bg-gray-50 transition">
                                <td className="p-4 text-sm font-medium text-gray-800">Vegetable Restock</td>
                                <td className="p-4 text-sm text-red-600 font-bold">-₹800</td>
                                <td className="p-4"><span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800 font-medium">Cash</span></td>
                                <td className="p-4 text-xs text-gray-400">Today, 8:00 AM</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition">
                                <td className="p-4 text-sm font-medium text-gray-800">Supplier Payment</td>
                                <td className="p-4 text-sm text-red-600 font-bold">-₹2,000</td>
                                <td className="p-4"><span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 font-medium">Bank Transfer</span></td>
                                <td className="p-4 text-xs text-gray-400">Yesterday</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}