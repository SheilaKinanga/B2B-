import { Bell, Package } from "lucide-react";
import type { User } from "../type";

interface TopNavProps {
  user: User;
  onLogout: () => void;
}

export default function TopNav({ user, onLogout }: TopNavProps) {
  return (
    <nav className="bg-white border-b border-gray-200 h-16 fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">ManufacturePro</h1>
          <p className="text-xs text-gray-500">Production Management</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Notifications"
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-gray-300"></div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
            <button
              onClick={onLogout}
              className="text-xs text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

