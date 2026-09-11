import { MdOutlineSearch, MdOutlineNotifications } from "react-icons/md";
import { UserButton } from "@clerk/clerk-react";

export default function Header() {
    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white shrink-0">
            {/* Left side - Branding (moved from sidebar) */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                    D
                </div>
                <h1 className="font-bold text-xl text-gray-800 hidden md:block tracking-tight">DhanChakra</h1>
            </div>

            {/* Middle - Search (Optional) */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-full max-w-md mx-4">
                <MdOutlineSearch className="text-gray-400 w-5 h-5 mr-2" />
                <input 
                    type="text" 
                    placeholder="Search transactions, inventory..." 
                    className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
                />
            </div>

            {/* Right side - Actions & Profile */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
                    <MdOutlineNotifications className="w-6 h-6" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                </button>
                
                <div className="h-8 w-px bg-gray-200 mx-2"></div>

                <div className="flex items-center gap-3 ml-2">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </header>
    )
}