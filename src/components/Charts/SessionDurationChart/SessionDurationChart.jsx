import { useState } from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@components/ui/card';
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
  const [range, setRange] = useState('last-3-months');
  const isTablet = useMediaQuery('(min-width: 768px)');

  const handleChange = (value) => {
    if (!value) return;
    setRange(value);
    console.log(value);
  };

  return (
    <Card className="grow">
      <CardHeader className="px-3 sm:px-6">
        <CardTitle>Average Session Duration</CardTitle>
        <CardDescription>Track average session duration.</CardDescription>
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
