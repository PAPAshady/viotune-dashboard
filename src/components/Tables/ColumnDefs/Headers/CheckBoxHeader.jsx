import { Checkbox } from '@components/ui/checkbox';

function CheckBoxHeader({ table }) {
  // Tanstack table is not compatible with react compiler.
  // Memoizing TanStack Table handlers causes stale closures and
  // breaks checkbox selection UI (state updates but visuals freeze).
  'use no memo';

  return (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={table.toggleAllPageRowsSelected}
    />
  );
}

export default CheckBoxHeader;
