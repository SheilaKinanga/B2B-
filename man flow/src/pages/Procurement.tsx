import { ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Procurement() {
  const { user } = useAuth();

  const canAdd =
    user?.role === "admin" || user?.role === "procurement";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Procurement</h2>
          <p className="text-gray-500 mt-1">
            Manage purchase orders and supplier relationships
          </p>
        </div>

        {canAdd && (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Procurement
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Procurement Module
        </h3>
        <p className="text-gray-500">
          Purchase orders, supplier management, and procurement analytics will
          appear here
        </p>
      </div>
    </div>
  );
}
