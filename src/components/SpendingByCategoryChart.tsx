import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

type CategoryData = {
  name: string;
  value: number;
  color?: string; 
};

const CHART_COLORS = [
  "#2563eb", // Blue
  "#22d3ee", // Cyan
  "#facc15", // Yellow
  "#16a34a", // Green
  "#e11d48", // Red
  "#a3e635", // Lime
  "#f472b6", // Pink
];

type SpendingByCategoryChartProps = {
  data: CategoryData[];
};

const SpendingByCategoryChart: React.FC<SpendingByCategoryChartProps> = ({ data }) => (
  <Card className="w-full max-w-md mt-6 border border-gray-200 mx-auto">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-semibold">Spending by Category</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center pt-0">
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              innerRadius="50%"
              strokeWidth={2}
              label={false}
              labelLine={false}
              isAnimationActive={false}
            >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                fontSize: "0.85rem",
                borderRadius: "0.5rem",
                padding: "0.5rem",
              }}
              formatter={(value: number, name: string) => [`$${value}`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend under the chart */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 w-full">
        {data.map((entry, idx) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: CHART_COLORS[idx % CHART_COLORS.length] }}
            >
              {entry.name}
            </span>
            <span className="text-xs text-gray-700 font-semibold">${entry.value}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default SpendingByCategoryChart;