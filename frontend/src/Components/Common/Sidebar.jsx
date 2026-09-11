import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "AI Assistant",
    path: "/ai-chat-test",
  },
  {
    label: "Transactions",
    path: "/transactions",
  },
  {
    label: "Payables",
    path: "/payables",
  },
  {
    label: "Receivables",
    path: "/receivables",
  },
  {
    label: "Working Capital",
    path: "/working-capital",
  },
  {
    label: "Forecast",
    path: "/forecast",
  },
  {
    label: "Risk & Safe to Spend",
    path: "/risk",
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-200 bg-white md:block">
      <div className="border-b border-gray-200 px-6 py-5">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">
          DhanChakra
        </h1>
      </div>

      <nav className="space-y-1 p-4">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;