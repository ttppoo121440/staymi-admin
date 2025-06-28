import * as React from 'react';
import { PieChart, Pie, LabelList, Label } from 'recharts';
import { TrendingUp } from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { useGetProductTotal } from '@/hooks/useProducts';
import { useSetLoading } from '@/hooks/useLoading';

export function PieGraph() {
  const { data, isPending } = useGetProductTotal(); // 從 API 拿資料
  useSetLoading(isPending);

  // 轉換 API 的 top5 成 chartData 格式
  const chartData = React.useMemo(() => {
    if (!data?.data?.top5) return [];
    return data.data.top5.map((item: { name: string; totalQuantitySold: number }, index: number) => ({
      name: item.name,
      count: item.totalQuantitySold,
      fill: `hsl(${(index + 1) * 60}, 70%, 50%)`,
    }));
  }, [data]);

  // 產生 config
  const chartConfig = React.useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    chartData.forEach((item) => {
      config[item.name] = { label: item.name, color: item.fill };
    });
    config['count'] = { label: '銷售數量', color: '#8884d8' };
    return config;
  }, [chartData]);

  // 總數
  const totalDishes = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>伴手禮銷售圓餅圖</CardTitle>
        <CardDescription>近期銷售前五名伴手禮</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" nameKey="name" innerRadius={60} strokeWidth={5}>
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: string) => {
                  // 從 chartData 中找到對應的項目
                  const item = chartData.find((d) => d.name === value);
                  const name = chartConfig[value]?.label || value;
                  const count = item?.count || 0;
                  return `${name}: ${count}`;
                }}
              />
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {data?.data.total || totalDishes}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          伴手禮銷售數量
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          本月上升 5.2% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">顯示最近銷售狀況</div>
      </CardFooter>
    </Card>
  );
}
