import { Package } from "lucide-react";
import "./inventory.css";

export default function Inventory() {
  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <h2>Inventory</h2>
        <p>
          Track stock levels, monitor warehouse activity, and manage inventory flow in one place.
        </p>
      </div>

      <div className="inventory-card">
        <div className="inventory-card-content">
          <div className="inventory-icon">
            <Package />
          </div>

          <h3>Inventory Module</h3>
          <p>
            Tools for stock management, warehouse operations, and real-time inventory tracking
            will appear here once configured.
          </p>

          <div className="inventory-actions">
            <button className="primary">Add Product</button>
            <button className="secondary">View Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
}