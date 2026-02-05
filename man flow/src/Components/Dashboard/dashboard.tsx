import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/button";
import { Package, Factory, ShoppingCart, DollarSign, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./dashboard.css";

const kpis = [
  { title: "Raw Materials", value: 1280, icon: Package, note: "In stock" },
  { title: "In Production", value: 420, icon: Factory, note: "Active batches" },
  { title: "Units Sold", value: 860, icon: ShoppingCart, note: "This month" },
  { title: "Revenue", value: "$24,300", icon: DollarSign, note: "MTD" },
];

const products = ["Perfumed", "Pure", "Coconut"];
const sizes = ["25g", "50g", "90g", "120g", "200g"];

// Add day property for chart
const initialProductionData = products.flatMap((product) =>
  sizes.map((size, index) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index % 7],
    product,
    size,
    produced: "",
  }))
);

export default function Dashboard() {
  const [productionData, setProductionData] = useState(initialProductionData);

  const handleProductionChange = (index: number, value: string) => {
    const updatedData = [...productionData];
    updatedData[index].produced = value === "" ? "" : Number(value);
    setProductionData(updatedData);
  };

  return (
    <div className="p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Operations Dashboard</h1>
        <Button className="h-11 px-6">New Procurement</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-5 w-5 opacity-70" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs opacity-60">{kpi.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Production Input + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Daily Production Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {products.map((product) => (
              <div key={product}>
                <h3 className="font-semibold mb-3">{product}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {sizes.map((size) => {
                    const index = productionData.findIndex(
                      (p) => p.product === product && p.size === size
                    );

                    return (
                      <div key={size} className="flex flex-col gap-1">
                        <label className="text-sm font-medium">{size}</label>
                        <input
                          type="number"
                          inputMode="numeric"
                          placeholder="Units"
                          value={productionData[index].produced}
                          onChange={(e) => handleProductionChange(index, e.target.value)}
                          className="h-11 rounded-md border px-3 text-base"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Production Chart */}
        <Card className="lg:col-span-2 rounded-2xl">
          <CardHeader>
            <CardTitle>Weekly Production Output</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={productionData.filter((d) => d.produced !== "")}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="produced" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 mt-0.5" />
            <p className="text-sm">Steel inventory below reorder level</p>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 mt-0.5" />
            <p className="text-sm">Batch #A12 delayed in QA</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>✔ Procurement order #PO-234 approved</li>
            <li>🏭 Manufacturing batch #MB-88 started</li>
            <li>📦 120 units dispatched to distributor</li>
            <li>💰 Payment received from Retailer X</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
