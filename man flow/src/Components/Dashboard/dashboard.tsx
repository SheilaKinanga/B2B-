import { useState } from "react";
import {
  Package,
  Factory,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./dashboard.css";

type ProductionEntry = {
  day: string;
  product: string;
  size: string;
  produced: number | "";
};

const kpis = [
  { title: "Raw Materials", value: 1280, icon: Package, note: "In stock" },
  { title: "In Production", value: 420, icon: Factory, note: "Active batches" },
  { title: "Units Sold", value: 860, icon: ShoppingCart, note: "This month" },
  { title: "Revenue", value: "$24,300", icon: DollarSign, note: "MTD" },
];

const products = ["Perfumed", "Pure", "Coconut"];
const sizes = ["25g", "50g", "90g", "120g", "200g"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const initialProductionData: ProductionEntry[] = products.flatMap((product) =>
  sizes.map((size, index) => ({
    day: days[index % days.length],
    product,
    size,
    produced: "",
  }))
);

export default function Dashboard() {
  const [productionData, setProductionData] =
    useState<ProductionEntry[]>(initialProductionData);

  const handleProductionChange = (index: number, value: string) => {
    const updated = [...productionData];
    updated[index].produced = value === "" ? "" : Number(value);
    setProductionData(updated);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Operations Dashboard</h1>
        <button className="primary-btn">New Procurement</button>
      </header>

      <section className="kpi-grid">
        {kpis.map((kpi) => (
          <div className="kpi-card" key={kpi.title}>
            <div className="kpi-header">
              <span>{kpi.title}</span>
              <kpi.icon size={18} />
            </div>
            <div className="kpi-value">{kpi.value}</div>
            <small>{kpi.note}</small>
          </div>
        ))}
      </section>

      <section className="main-grid">
        <div className="section">
          <h2>Daily Production Input</h2>

          {products.map((product) => (
            <div key={product} className="product-block">
              <h3>{product}</h3>
              <div className="input-grid">
                {sizes.map((size) => {
                  const index = productionData.findIndex(
                    (p) => p.product === product && p.size === size
                  );
                  if (index === -1) return null;

                  return (
                    <div className="input-item" key={size}>
                      <label>{size}</label>
                      <input
                        type="number"
                        value={productionData[index].produced}
                        onChange={(e) =>
                          handleProductionChange(index, e.target.value)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Weekly Production Output</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={productionData.filter((d) => d.produced !== "")}
            >
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line dataKey="produced" stroke="#000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="section">
        <h2>System Alerts</h2>
        <p><AlertTriangle size={14} /> Steel inventory low</p>
        <p><AlertTriangle size={14} /> Batch A12 delayed</p>
      </section>
    </div>
  );
}
