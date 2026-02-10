import { MusicIcon } from 'lucide-react';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

function PrimaryTableEmpty() {
  return (
    <div className="flex justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MusicIcon />
          </EmptyMedia>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            We coundn't find anything that matches your search. <br /> Try adjusting your keywords
            or filters.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}

export default PrimaryTableEmpty;
