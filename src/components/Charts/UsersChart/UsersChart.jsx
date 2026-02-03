import { useState, useMemo } from 'react';

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
import { Spinner } from '@components/ui/spinner';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useQuery } from '@tanstack/react-query';

import useMediaQuery from '@/hooks/useMediaQuery';
import { getUsersStatsSinceQuery } from '@/queries/stats';
import { addDateLabelToChartData } from '@/utils';

const chartConfig = {
  desktop: {
    label: 'Users',
    color: 'var(--chart-4)',
  },
};

function UsersChart() {
  const [range, setRange] = useState(90);
  const { data, isPending } = useQuery(getUsersStatsSinceQuery(range));
  const isTablet = useMediaQuery('(min-width: 768px)');

  const handleChange = (value) => {
    if (!value) return;
    setRange(value);
  };

  const chartData = useMemo(() => addDateLabelToChartData(data), [data]);

  return (
    <Card className="grow">
      <CardHeader className="px-3 sm:px-6">
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
                <SelectItem value={90}>Last 3 months</SelectItem>
                <SelectItem value={30}>Last 30 days</SelectItem>
                <SelectItem value={7}>Last 7 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 md:ps-0 md:pe-6">
        <ChartContainer config={chartConfig} className="max-h-50 min-h-42 w-full">
          {isPending ? (
            <div className="flex size-full items-center justify-center">
              <Spinner className="xs:size-13 size-10" />
            </div>
          ) : (
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="today_users" name="Users" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <CartesianGrid vertical={false} />
              <XAxis dataKey="dateLabel" />
              <YAxis hide={!isTablet} />
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default UsersChart;
