import { useState } from "react";
import {Card, CardContent,CardHeader,CardTitle} from "components/ui/card";
import { Button } from "components/ui/button";
import {Package,Factory,ShoppingCart,DollarSign,AlertTriangle} from "lucide-react";
import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,} from "recharts";
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

const initialProductionData: ProductionEntry[] = products.flatMap(
  (product) =>
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
      {/* Header */}
      <div className="dashboard-header">
        <h1>Operations Dashboard</h1>
        <Button>New Procurement</Button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="kpi-header">
              <CardTitle>{kpi.title}</CardTitle>
              <kpi.icon size={18} />
            </CardHeader>
            <CardContent>
              <div className="kpi-value">{kpi.value}</div>
              <small>{kpi.note}</small>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Production + Chart */}
      <div className="main-grid">
        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Production Input</CardTitle>
          </CardHeader>
          <CardContent>
            {products.map((product) => (
              <div key={product} className="product-block">
                <h4>{product}</h4>
                <div className="input-grid">
                  {sizes.map((size) => {
                    const index = productionData.findIndex(
                      (p) => p.product === product && p.size === size
                    );
                    if (index === -1) return null;

                    return (
                      <div key={size}>
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
          </CardContent>
        </Card>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Production</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={productionData.filter(
                  (d) => d.produced !== ""
                )}
              >
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="produced"
                  stroke="#000"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p><AlertTriangle size={14} /> Steel inventory low</p>
          <p><AlertTriangle size={14} /> Batch A12 delayed</p>
        </CardContent>
      </Card>
    </div>
  );
}
