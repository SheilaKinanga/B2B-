import { Factory } from 'lucide-react';

export default function Production() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">In Production</h2>
        <p className="text-gray-500 mt-1">
          Monitor active production lines and work orders
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
          <Factory className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Production Module
        </h3>
        <p className="text-gray-500">
          Production schedules, work orders, and manufacturing status will appear here
        </p>
      </div>
    </div>
  );
}
