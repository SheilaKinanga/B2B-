import { Package } from 'lucide-react';

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Inventory</h2>
        <p className="text-gray-500 mt-1">
          Track stock levels and manage warehouse operations
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-full mb-4">
          <Package className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Inventory Module
        </h3>
        <p className="text-gray-500">
          Stock management, warehouse operations, and inventory tracking will appear here
        </p>
      </div>
    </div>
  );
}
