import { useState } from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import useMediaQuery from '@/hooks/useMediaQuery';

const chartData = [
  { month: 'January', users: 530 },
  { month: 'February', users: 180 },
  { month: 'March', users: 490 },
  { month: 'April', users: 160 },
  { month: 'May', users: 400 },
];

const chartConfig = {
  desktop: {
    label: 'Users',
    color: 'var(--chart-2)',
  },
};

function TotalPlaysChart() {
  const isTablet = useMediaQuery('(min-width: 1024px)');
  const [range, setRange] = useState('last-3-months');

  const handleChange = (value) => {
    if (!value) return;
    setRange(value);
    console.log(value);
  };

  return (
    <Card>
      <CardHeader className="xs:px-6 px-3">
        <CardTitle>Plays over time</CardTitle>
        <CardDescription>Total for the {range.replace(/-/g, ' ')}</CardDescription>
        <CardAction>
          {isTablet ? (
            <ToggleGroup type="single" variant="outline" value={range} onValueChange={handleChange}>
              <ToggleGroupItem value="last-3-months">Last 3 months</ToggleGroupItem>
              <ToggleGroupItem value="last-30-days">Last 30 days</ToggleGroupItem>
              <ToggleGroupItem value="last-7-days">Last 7 days</ToggleGroupItem>
            </ToggleGroup>
          ) : (
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
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="max-h-70 min-h-42 w-full min-[1300px]:max-h-75"
        >
          <AreaChart data={chartData}>
            {/* define gradient for chart */}
            <defs>
              <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              dataKey="users"
              type="monotone"
              stroke="var(--primary)"
              fill="url(#usersGradient)" // use gradient for chart
            />
            <XAxis dataKey="month" />
            <YAxis hide={!isTablet} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <CartesianGrid vertical={false} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default TotalPlaysChart;
