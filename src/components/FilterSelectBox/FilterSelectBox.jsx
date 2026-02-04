import { Label } from '@components/ui/label';
import { NativeSelect, NativeSelectOption } from '../ui/native-select';

function FilterSelectBox({ filterName, placeholder, options, value, onChange }) {
  return (
    <div className="space-y-3">
      <Label>{filterName}</Label>
      <NativeSelect value={value} onChange={onChange} className="bg-[#192134]! font-semibold">
        <NativeSelectOption value="">{placeholder}</NativeSelectOption>
        {options.map((option) => (
          <NativeSelectOption key={option.label} value={option.value}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}

export default FilterSelectBox;
