import { Link } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import { useSelector } from "react-redux";

function Header({ onMenuClick }) {
  // Get assignments from Redux
  const assignments = useSelector(
    (state) => state.assignments || []
  );

  // Count pending assignments
  const pendingCount = assignments.filter(
    (assignment) => assignment.status === "PENDING"
  ).length;
  console.log("Assignments:", assignments);
console.log("Pending count:", pendingCount);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">

      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="hidden text-sm text-slate-500 sm:block">
            Developer Resource Management
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Notifications */}
<Link
  to="/notifications"
  className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
  aria-label={`Notifications${
    pendingCount > 0 ? `, ${pendingCount} pending` : ""
  }`}
>
  <Bell size={22} />

  <div className="mt-10 bg-red-500 p-5 text-4xl font-bold text-white">
    5
  </div>
</Link>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* User */}
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
            M
          </div>

          <span className="text-sm font-medium text-slate-700">
            Murli
          </span>
        </div>

      </div>
    </header>
  );
}

export default Header;