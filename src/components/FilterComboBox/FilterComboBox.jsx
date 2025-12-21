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

import { cn } from '@/lib/utils';

function FilterComboBox({ filterName, placeholder, options, valueKey = 'title', onSelect }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const comboBoxPlaceholder = placeholder ?? 'Select...';

  const onSelectHandler = (currentValue) => {
    setValue(currentValue);
    setOpen(false);
    onSelect?.(currentValue);
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
            {value
              ? options.find((option) => option[valueKey] === value)?.[valueKey]
              : comboBoxPlaceholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className={cn('w-full p-0')}>
          {/* We disable the built-in filtering functionality because we are fetching options from
          the server.*/}
          <Command shouldFilter={false}>
            <CommandInput placeholder={comboBoxPlaceholder} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem value="" onSelect={onSelectHandler}>
                  {comboBoxPlaceholder}
                </CommandItem>
                {options.map((option) => (
                  <CommandItem value={option[valueKey]} key={option.id} onSelect={onSelectHandler}>
                    {option[valueKey]}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === option[valueKey] ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FilterComboBox;
