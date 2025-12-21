import { useState } from 'react';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { Badge } from '@components/ui/badge';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

function FilterBar({ children }) {
  const hasActiveFilters = false; // Replace with actual logic to determine if filters are active
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="mb-4 flex gap-3">
        <CollapsibleTrigger asChild>
          <Button variant="secondary">
            <ChevronDownIcon
              className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
            />
            Filters
            {hasActiveFilters && (
              <Badge className="ml-1 text-white" variant="outline">
                1
              </Badge>
            )}
          </Button>
        </CollapsibleTrigger>
        {hasActiveFilters && (
          <Button variant="outline">
            <XIcon /> Clear all
          </Button>
        )}
      </div>
      <CollapsibleContent>
        {children && (
          <Card>
            <CardContent className="grid gap-4 px-4 min-[480px]:grid-cols-2 min-[1100px]:grid-cols-4! sm:px-6">
              {children}
            </CardContent>
          </Card>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default FilterBar;
