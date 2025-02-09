import { Bar, BarChart, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

export function MyChart() {
  // Define data
  const data = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 45 },
    { name: "Mar", value: 60 },
    { name: "Apr", value: 75 },
  ];

  return (
    <ChartContainer className="w-full h-[300px]">
      <BarChart width={400} height={300} data={data}>
        <Bar dataKey="value" fill="#8884d8" />
        <Tooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  );
}
