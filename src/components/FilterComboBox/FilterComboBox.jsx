import { useState } from 'react';

import { Label } from '@components/ui/label';
import { Button } from '@components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Skeleton } from '@components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar';

import { cn } from '@/lib/utils';

function FilterComboBox({
  filterName,
  placeholder,
  options,
  isPending,
  valueKey = 'title',
  onChange,
  value,
}) {
  const [open, setOpen] = useState(false);
  const comboBoxPlaceholder = placeholder ?? 'Select...';

  const onSelectHandler = (id) => {
    setOpen(false);
    onChange?.(id);
  };

  return (
    <div className="space-y-3">
      <Label>{filterName}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn('w-full justify-between')}
          >
            {/* show the selected value. if nothing is selected, show the placeholder */}
            {value
              ? options.find((option) => option.id === value)?.[valueKey]
              : comboBoxPlaceholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className={cn('w-full p-0')}>
          <Command>
            <CommandInput placeholder={comboBoxPlaceholder} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {/* show loading state while items are fetching */}
                {isPending ? (
                  Array(6)
                    .fill()
                    .map((_, index) => (
                      <CommandItem key={index}>
                        <div className="flex items-center gap-2">
                          <Skeleton className="flex size-8 shrink-0 rounded-full" />
                          <Skeleton className="h-3 w-28" />
                        </div>
                      </CommandItem>
                    ))
                ) : (
                  <>
                    {/* show an empty option at the start of the list so user can select nothing */}
                    <CommandItem value="" onSelect={onSelectHandler}>
                      {comboBoxPlaceholder}
                    </CommandItem>
                    {options.map((option) => (
                      <CommandItem
                        value={option.id}
                        key={option.id}
                        onSelect={onSelectHandler}
                        className={cn(value === option.id && 'bg-accent/50')}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage
                              src={option.image || option.cover}
                              alt={option[valueKey]}
                              className="object-cover"
                            />
                            <AvatarFallback>{option[valueKey].charAt(0)}</AvatarFallback>
                          </Avatar>
                          {option[valueKey]}
                        </div>
                        <Check
                          className={cn(
                            'ml-auto',
                            value === option.id ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FilterComboBox;
