import { useState, useMemo } from 'react';

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
import { Spinner } from '@components/ui/spinner';
import { useQuery } from '@tanstack/react-query';

import useMediaQuery from '@/hooks/useMediaQuery';
import { getPlaysStatsSinceQuery } from '@/queries/stats';
import { addDateLabelToChartData } from '@/utils';

const chartConfig = {
  label: 'Plays',
  color: 'var(--chart-2)',
};

function TotalPlaysChart() {
  const isTablet = useMediaQuery('(min-width: 1024px)');
  const [range, setRange] = useState(90);
  const { data, isPending } = useQuery(getPlaysStatsSinceQuery(range));

  const handleChange = (value) => {
    if (!value) return;
    setRange(value);
  };

  const chartData = useMemo(() => addDateLabelToChartData(data), [data]);

  return (
    <Card>
      <CardHeader className="xs:px-6 px-3">
        <CardTitle>Plays over time</CardTitle>
        <CardDescription>Total for the last {range} days</CardDescription>
        <CardAction>
          {isTablet ? (
            <ToggleGroup type="single" variant="outline" value={range} onValueChange={handleChange}>
              <ToggleGroupItem value={90}>Last 3 months</ToggleGroupItem>
              <ToggleGroupItem value={30}>Last 30 days</ToggleGroupItem>
              <ToggleGroupItem value={7}>Last 7 days</ToggleGroupItem>
            </ToggleGroup>
          ) : (
            <Select onValueChange={handleChange} value={range}>
              <SelectTrigger>
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a time range</SelectLabel>
                  <SelectItem value={90}>Last 3 months</SelectItem>
                  <SelectItem value={30}>Last 30 days</SelectItem>
                  <SelectItem value={7}>Last 7 days</SelectItem>
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
          {isPending ? (
            <div className="flex size-full items-center justify-center">
              <Spinner className="xs:size-13 size-10" />
            </div>
          ) : (
            <AreaChart data={chartData}>
              {/* define gradient for chart */}
              <defs>
                <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <Area
                dataKey="today_plays"
                type="monotone"
                stroke="var(--primary)"
                fill="url(#usersGradient)" // use gradient for chart
              />
              <XAxis dataKey="dateLabel" />
              <YAxis hide={!isTablet} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <CartesianGrid vertical={false} />
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default TotalPlaysChart;
