import { InputGroup, InputGroupInput, InputGroupAddon } from '@components/ui/input-group';
import { SearchIcon } from 'lucide-react';

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="sm:-mt-5">
      <InputGroup>
        <InputGroupInput value={value} onChange={onChange} placeholder={placeholder} />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export default SearchInput;
