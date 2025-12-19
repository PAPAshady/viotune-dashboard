import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import useMediaQuery from '@/hooks/useMediaQuery';

const chartData = [
  { day: 'Mon', duration: 32 },
  { day: 'Tue', duration: 38 },
  { day: 'Wed', duration: 35 },
  { day: 'Thu', duration: 42 },
  { day: 'Fri', duration: 48 },
  { day: 'Sat', duration: 52 },
  { day: 'Sun', duration: 49 },
];

const chartConfig = {
  desktop: {
    label: 'Duration',
    color: 'var(--chart-4)',
  },
};

function SessionDurationChart() {
  const isTablet = useMediaQuery('(min-width: 768px)');

  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>Average Session Duration</CardTitle>
        <CardDescription>Track average session duration.</CardDescription>
      </CardHeader>
      <CardContent className="px-2 md:ps-0 md:pe-6">
        <ChartContainer config={chartConfig} className="max-h-50 min-h-42 w-full">
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="duration" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" />
            <YAxis hide={!isTablet} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default SessionDurationChart;
