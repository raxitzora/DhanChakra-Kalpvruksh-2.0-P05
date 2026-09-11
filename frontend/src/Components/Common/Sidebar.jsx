import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
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
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">
          DhanChakra
        </h1>
      </div>

      <nav className="p-4">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `mb-1 block rounded-lg px-4 py-3 text-sm ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
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