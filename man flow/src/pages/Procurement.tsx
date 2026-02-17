import { ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import type { ProcurementItem } from "../type";

export default function Procurement() {
  const { user } = useAuth();

  const [items, setItems] = useState<ProcurementItem[]>([]);

  /* ---------------- RBAC ---------------- */
  const canAdd =
    user?.role === "admin" || user?.role === "procurement";

  const canEdit =
    user?.role === "admin" || user?.role === "procurement";

  const canDelete = user?.role === "admin";

  const canApprove = user?.role === "admin";

  /* ------------- Persistence ------------ */
  useEffect(() => {
    const stored = localStorage.getItem("procurement-items");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "procurement-items",
      JSON.stringify(items)
    );
  }, [items]);

  /* ---------------- Actions ---------------- */
  const addProcurement = () => {
    const newItem: ProcurementItem = {
      id: crypto.randomUUID(),
      item: "Raw Material",
      quantity: 10,
      cost: 500,
      status: "pending",
    };

    setItems([...items, newItem]);
  };

  const editQuantity = (id: string) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const approveItem = (id: string) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, status: "approved" } : i
    ));
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Procurement
          </h2>
          <p className="text-gray-500 mt-1">
            Manage purchase orders and supplier relationships
          </p>
        </div>

        {canAdd && (
          <button
            onClick={addProcurement}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Procurement
          </button>
        )}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Procurement Module
          </h3>
          <p className="text-gray-500">
            Purchase orders, supplier management, and procurement
            analytics will appear here
          </p>
        </div>
      )}

      {/* List */}
      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {p.item}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {p.quantity} • Cost: ${p.cost}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    p.status === "approved"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {p.status.toUpperCase()}
                </p>
              </div>

              <div className="flex gap-3 text-sm">
                {canEdit && (
                  <button
                    onClick={() => editQuantity(p.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                )}

                {canApprove && p.status === "pending" && (
                  <button
                    onClick={() => approveItem(p.id)}
                    className="text-green-600 hover:underline"
                  >
                    Approve
                  </button>
                )}

                {canDelete && (
                  <button
                    onClick={() => deleteItem(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
