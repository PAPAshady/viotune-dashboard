import { InputGroup, InputGroupInput, InputGroupAddon } from '@components/ui/input-group';
import { SearchIcon } from 'lucide-react';

function SearchInput({ placeholder }) {
  return (
    <div className="sm:-mt-5">
      <InputGroup>
        <InputGroupInput placeholder={placeholder} />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export default SearchInput;
