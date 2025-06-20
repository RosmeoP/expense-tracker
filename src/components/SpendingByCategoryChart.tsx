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
  <Card className="w-full h-[355px] theme-card theme-border border">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-semibold theme-text">Spending by Category</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center pt-0">
      <div className="w-full h-24 sm:h-28 xs:h-20">
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
              {data.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                fontSize: "0.85rem",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)"
              }}
              formatter={(value: number, name: string) => [`$${value}`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend under the chart */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 w-full sm:flex-row flex-col items-center">
        {data.map((entry, idx) => (
          <div
            key={entry.name}
            className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-0 text-[13px] sm:text-[15px] font-medium"
            style={{ minWidth: 90 }}
          >
            <span
              className="inline-block rounded-full"
              style={{
                backgroundColor: entry.color || CHART_COLORS[idx % CHART_COLORS.length],
                width: 12,
                height: 12,
                marginRight: 6,
              }}
            />
            <span className="whitespace-nowrap theme-text">{entry.name}</span>
            <span className="ml-1 theme-text-secondary font-semibold">${entry.value}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default SpendingByCategoryChart;