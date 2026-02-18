import { ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import type { ProcurementItem, ProcurementStatus } from "../type";

export default function Procurement() {
  const { user } = useAuth();
  const [items, setItems] = useState<ProcurementItem[]>([]);

  /* ---------------- RBAC ---------------- */
  const canAdd = user?.role === "admin" || user?.role === "procurement";
  const canEdit = user?.role === "admin" || user?.role === "procurement";
  const canDelete = user?.role === "admin";
  const canApprove = user?.role === "admin";

  /* ------------- Persistence ------------ */
  useEffect(() => {
    const stored = localStorage.getItem("procurement-items");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("procurement-items", JSON.stringify(items));
  }, [items]);

  /* ---------------- Actions ---------------- */
  const addProcurement = () => {
    const item = prompt("Item name?");
    const quantity = Number(prompt("Quantity?"));
    const cost = Number(prompt("Cost?"));

    if (!item || quantity <= 0 || cost <= 0 || !user) {
      alert("Invalid input");
      return;
    }

    const newItem: ProcurementItem = {
      id: crypto.randomUUID(),
      item,
      quantity,
      cost,
      status: "pending",

      createdBy: user.name,
      createdAt: new Date().toISOString(),
    };

    setItems((prev) => [...prev, newItem]);
  };

  const editItem = (id: string) => {
    const target = items.find((i) => i.id === id);
    if (!target || target.status !== "pending") return;

    const quantity = Number(prompt("New quantity?", String(target.quantity)));
    const cost = Number(prompt("New cost?", String(target.cost)));

    if (quantity <= 0 || cost <= 0) return;

    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity, cost } : i
      )
    );
  };

  const deleteItem = (id: string) => {
    const target = items.find((i) => i.id === id);
    if (!target || target.status !== "pending") return;

    if (!confirm("Delete this procurement item?")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateStatus = (id: string, status: ProcurementStatus) => {
    if (!user) return;

    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== id || i.status !== "pending") return i;

        if (status === "approved") {
          return {
            ...i,
            status,
            approvedBy: user.name,
            approvedAt: new Date().toISOString(),
          };
        }

        if (status === "rejected") {
          return {
            ...i,
            status,
            rejectedBy: user.name,
            rejectedAt: new Date().toISOString(),
          };
        }

        return i;
      })
    );
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
            No procurement items yet
          </h3>
          <p className="text-gray-500">
            Add your first procurement to get started
          </p>
        </div>
      )}

      {/* List */}
      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {p.item}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {p.quantity} • Cost: ksh{p.cost}
                </p>

                <p
                  className={`text-xs mt-1 ${
                    p.status === "approved"
                      ? "text-green-600"
                      : p.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {p.status.toUpperCase()}
                </p>

                <div className="text-xs text-gray-400 mt-2 space-y-1">
                  <p>
                    Created by {p.createdBy} on{" "}
                    {new Date(p.createdAt).toLocaleString()}
                  </p>

                  {p.approvedBy && (
                    <p>
                      Approved by {p.approvedBy} on{" "}
                      {new Date(p.approvedAt!).toLocaleString()}
                    </p>
                  )}

                  {p.rejectedBy && (
                    <p>
                      Rejected by {p.rejectedBy} on{" "}
                      {new Date(p.rejectedAt!).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 text-sm">
                {canEdit && p.status === "pending" && (
                  <button
                    onClick={() => editItem(p.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                )}

                {canApprove && p.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(p.id, "approved")}
                      className="text-green-600 hover:underline"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(p.id, "rejected")}
                      className="text-red-600 hover:underline"
                    >
                      Reject
                    </button>
                  </>
                )}

                {canDelete && p.status === "pending" && (
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
