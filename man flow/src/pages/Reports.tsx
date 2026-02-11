import { BarChart3 } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
        <p className="text-gray-500 mt-1">
          Generate insights and analyze business performance
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full mb-4">
          <BarChart3 className="w-8 h-8 text-teal-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Reports & Analytics Module
        </h3>
        <p className="text-gray-500">
          Business intelligence, reports, and data analytics will appear here
        </p>
      </div>
    </div>
  );
}
