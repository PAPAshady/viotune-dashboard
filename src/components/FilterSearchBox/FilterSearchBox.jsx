import { Label } from '@components/ui/label';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@components/ui/input-group';
import { SearchIcon } from 'lucide-react';

function FilterSearchBox({ filterName, placeholder, value, onChange }) {
  return (
    <div className="space-y-3">
      <Label>{filterName}</Label>
      <InputGroup>
        <InputGroupInput type="text" value={value} onChange={onChange} placeholder={placeholder} />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export default FilterSearchBox;
