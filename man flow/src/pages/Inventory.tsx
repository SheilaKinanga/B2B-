import { Package } from "lucide-react";
import "./inventory.css";

const inventoryData = [
  {
    id: "INV-001",
    name: "Steel Rods",
    category: "Raw Materials",
    quantity: 320,
    status: "In Stock",
    warehouse: "Main Warehouse",
  },
  {
    id: "INV-002",
    name: "Plastic Casings",
    category: "Components",
    quantity: 45,
    status: "Low Stock",
    warehouse: "Secondary Warehouse",
  },
  {
    id: "INV-003",
    name: "Finished Units",
    category: "Finished Goods",
    quantity: 0,
    status: "Out of Stock",
    warehouse: "Main Warehouse",
  },
];

export default function Inventory() {
  return (
    <div className="inventory-page">
      {/* Header */}
      <div className="inventory-header">
        <h2>Inventory</h2>
        <p>
          Track stock levels, monitor warehouse activity, and manage inventory flow in one place.
        </p>
      </div>

      {/* Actions */}
      <div className="inventory-toolbar">
        <button className="primary">Add Product</button>
        <button className="secondary">View Reports</button>
      </div>

      {/* Table */}
      <div className="inventory-table-card">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Warehouse</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {inventoryData.map((item) => (
              <tr key={item.id}>
                <td className="product-cell">
                  <Package className="product-icon" />
                  <span>{item.name}</span>
                </td>
                <td>{item.category}</td>
                <td>{item.warehouse}</td>
                <td>{item.quantity}</td>
                <td>
                  <span
                    className={`status-badge ${item.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}