import {Link} from "react-router-dom"
import {} from "react"
import { Bell, Menu} from "lucide-react"

function Header({ onMenuClick }) {
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
      <div className="flex items-center gap-2">
        <Link
          to="/notifications"
          className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </Link>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

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
        
        
        
       