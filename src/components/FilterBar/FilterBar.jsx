import { useState } from 'react';

import { Button } from '../ui/button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { Badge } from '@components/ui/badge';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

function FilterBar({ children }) {
  const hasActiveFilters = false; // Replace with actual logic to determine if filters are active
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex gap-3">
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
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}

export default FilterBar;
