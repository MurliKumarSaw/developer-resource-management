import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ClipboardList,
  Bell,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const navItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Developers",
    icon: Users,
    path: "/developers",
  },
  {
    name: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    name: "Assignments",
    icon: ClipboardList,
    path: "/assignments",
  },
  {
    name: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
  {
    name: "Logout",
    icon: X,
    path: "/logout",
  },
];

export default function Sidebar({ isOpen, onClose }) {
  // Get assignments from Redux
  const assignments = useSelector(
    (state) => state.assignments
  );

  // Count pending assignments
  const pendingCount = assignments.filter(
    (assignment) => assignment.status === "PENDING"
  ).length;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              ResourceHub
            </h1>

            <p className="text-xs text-slate-500">
              Developer Management
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                    flex items-center gap-3 rounded-lg px-3 py-2.5
                    text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }
                  `
                }
              >
                <Icon size={19} />

                <span className="flex-1">
                  {item.name}
                </span>

                {/* Pending notification count */}
                {item.name === "Notifications" &&
                  pendingCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                      {pendingCount}
                    </span>
                  )}
              </NavLink>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
              M
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                Murli
              </p>

              <p className="truncate text-xs text-slate-500">
                Resource Manager
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}