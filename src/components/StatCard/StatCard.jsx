import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

import { cn } from '@/lib/utils';

function StatCard({ title, value, progress, icon }) {
  const Icon = icon;
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <h3 className="mt-2 text-2xl font-bold md:text-3xl">{value.toLocaleString()}</h3>
            <p
              className={cn(
                'mt-1 flex items-center text-xs md:text-sm',
                progress < 0 ? 'text-red-400' : 'text-blue-400'
              )}
            >
              {progress < 0 ? (
                <ArrowDownIcon className="mr-1 min-h-4 min-w-4" />
              ) : (
                <ArrowUpIcon className="mr-1 min-h-4 min-w-4" />
              )}
              {progress}% from last month
            </p>
          </div>
          <div className="bg-primary/10 rounded-full p-3">
            <Icon className="text-primary h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
