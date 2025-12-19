import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import useMediaQuery from '@/hooks/useMediaQuery';

const chartData = [
  { day: 'Mon', users: 32 },
  { day: 'Tue', users: 38 },
  { day: 'Wed', users: 35 },
  { day: 'Thu', users: 42 },
  { day: 'Fri', users: 48 },
  { day: 'Sat', users: 52 },
  { day: 'Sun', users: 49 },
];

const chartConfig = {
  desktop: {
    label: 'Users',
    color: 'var(--chart-4)',
  },
};

function UsersChart() {
  const isTablet = useMediaQuery('(min-width: 768px)');

  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>Users over time</CardTitle>
        <CardDescription>Track user growth on the platform.</CardDescription>
      </CardHeader>
      <CardContent className="px-2 md:ps-0 md:pe-6">
        <ChartContainer config={chartConfig} className="max-h-50 min-h-42 w-full">
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="users" />
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

export default UsersChart;
