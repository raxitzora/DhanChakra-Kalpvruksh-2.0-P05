import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineReceiptLong, MdOutlineInventory, MdOutlinePeople, MdOutlineInsights, MdOutlineSettings } from "react-icons/md";

export default function Sidebar() {
    const location = useLocation();
    
    return (
        <aside className="w-64 h-screen border-r border-gray-200 bg-white flex flex-col">
            <nav className="flex-1 px-4 py-4 space-y-2">
                <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${location.pathname === '/dashboard' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <MdOutlineDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                </Link>
                <Link to="/transactions" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${location.pathname === '/transactions' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <MdOutlineReceiptLong className="w-5 h-5" />
                    <span>Transactions</span>
                </Link>
                <Link to="/inventory" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${location.pathname === '/inventory' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <MdOutlineInventory className="w-5 h-5" />
                    <span>Inventory</span>
                </Link>
                <Link to="/suppliers" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${location.pathname === '/suppliers' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <MdOutlinePeople className="w-5 h-5" />
                    <span>Suppliers</span>
                </Link>
                <Link to="/forecast" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${location.pathname === '/forecast' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <MdOutlineInsights className="w-5 h-5" />
                    <span>Forecast</span>
                </Link>
                <Link to="/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${location.pathname === '/settings' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <MdOutlineSettings className="w-5 h-5" />
                    <span>Settings</span>
                </Link>
            </nav>
        </aside>
    )
}