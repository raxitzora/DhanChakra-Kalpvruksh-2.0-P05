export default function Transactions() {
    // Dummy data for the prototype
    const transactions = [
        { id: 1, date: '2023-10-27', description: 'Customer Sale (Cash)', type: 'Income', amount: 500, method: 'Cash', status: 'Settled' },
        { id: 2, date: '2023-10-27', description: 'Customer Sale (UPI)', type: 'Income', amount: 1200, method: 'UPI', status: 'Pending' },
        { id: 3, date: '2023-10-26', description: 'Restock Vegetables', type: 'Expense', amount: 800, method: 'Cash', status: 'Settled' },
        { id: 4, date: '2023-10-26', description: 'Electricity Bill', type: 'Expense', amount: 300, method: 'Card', status: 'Settled' },
        { id: 5, date: '2023-10-25', description: 'Supplier Payment (Due)', type: 'Payable', amount: 2000, method: 'Pending', status: 'Due Tomorrow' },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Transactions Ledger</h2>
                <div className="space-x-2">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Log Income</button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">Log Expense</button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold">Description</th>
                            <th className="p-4 font-semibold">Amount</th>
                            <th className="p-4 font-semibold">Method</th>
                            <th className="p-4 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                <td className="p-4 text-sm text-gray-700">{tx.date}</td>
                                <td className="p-4 text-sm font-medium text-gray-800">{tx.description}</td>
                                <td className={`p-4 text-sm font-bold ${tx.type === 'Income' ? 'text-green-600' : tx.type === 'Expense' ? 'text-red-600' : 'text-yellow-600'}`}>
                                    {tx.type === 'Income' ? '+' : '-'}₹{tx.amount}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                        tx.method === 'Cash' ? 'bg-emerald-100 text-emerald-800' :
                                        tx.method === 'UPI' ? 'bg-blue-100 text-blue-800' :
                                        tx.method === 'Card' ? 'bg-purple-100 text-purple-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {tx.method}
                                    </span>
                                </td>
                                <td className="p-4">
                                     <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                        tx.status === 'Settled' ? 'bg-green-100 text-green-800' :
                                        tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
