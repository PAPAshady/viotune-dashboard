import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart';
import { BarChart, XAxis, YAxis, Bar, CartesianGrid } from 'recharts';

import useMediaQuery from '@hooks/useMediaQuery';

const chartConfig = {
  label: 'plays',
  color: 'var(--chart-3)',
};

function MostPlaysChart({ chartTitle, data, yAxisDataKey, barDataKey }) {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 md:ps-0 md:pe-6">
        <ChartContainer config={chartConfig} className="max-h-75 w-full">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              dataKey={yAxisDataKey}
              type="category"
              tick={{ fontSize: isMobile ? 10 : 13 }}
              width={isMobile ? 80 : 110}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              width={10}
              dataKey={barDataKey}
              fill="oklch(62.3% 0.214 259.815)"
              barSize={isMobile ? 15 : 25}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default MostPlaysChart;
