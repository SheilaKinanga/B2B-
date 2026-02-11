import { TrendingUp } from 'lucide-react';

export default function Sales() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Sales & Distribution</h2>
        <p className="text-gray-500 mt-1">
          Manage orders, deliveries, and customer relationships
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-full mb-4">
          <TrendingUp className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Sales & Distribution Module
        </h3>
        <p className="text-gray-500">
          Sales orders, distribution management, and customer analytics will appear here
        </p>
      </div>
    </div>
  );
}
