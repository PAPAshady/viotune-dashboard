import { Button } from '@components/ui/button';
import { UploadIcon, SearchIcon } from 'lucide-react';
import { useIsMobile } from '@hooks/use-mobile';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@components/ui/input-group';

import PageHeader from '@components/shared/PageHeader/PageHeader';

function Songs() {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader title="Songs" description="Manage and analyze all uploaded songs." />
        <div className="flex-wra -mt-6 flex gap-2 sm:m-0 sm:justify-end">
          <Button size={isMobile ? 'sm' : 'default'} variant="outline">
            Bulk Actions (0)
          </Button>
          <Button
            size={isMobile ? 'sm' : 'default'}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <UploadIcon /> Upload Song
          </Button>
        </div>
      </div>
      <div className="sm:-mt-5">
        <InputGroup>
          <InputGroupInput placeholder="Search by song title or artist..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}

export default Songs;
