import { useState } from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@components/ui/select';
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
  const [range, setRange] = useState('last-3-months');
  const isTablet = useMediaQuery('(min-width: 768px)');

  const handleChange = (value) => {
    if (!value) return;
    setRange(value);
    console.log(value);
  };

  return (
    <Card className="grow">
      <CardHeader className='px-3 sm:px-6'>
        <CardTitle>Users over time</CardTitle>
        <CardDescription>Track user growth on the platform.</CardDescription>
        <CardAction>
          <Select onValueChange={handleChange} value={range}>
            <SelectTrigger>
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a time range</SelectLabel>
                <SelectItem value="last-3-months">Last 3 months</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
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
