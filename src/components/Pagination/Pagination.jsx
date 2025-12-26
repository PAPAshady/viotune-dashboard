import { cn } from '@/lib/utils';
import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
} from '@/components/ui/pagination';

import { getPagination } from '@/utils';

function Pagination({ pageNumber, pageCount, siblingCount, boundryCount, setPageIndex }) {
  const isPrevDisabled = pageNumber <= 1;
  const isNextDisabled = pageNumber >= pageCount;

  return (
    <PaginationWrapper>
      <PaginationContent>
        <PaginationPrevious
          onClick={() => setPageIndex(pageNumber - 2)}
          disabled={isPrevDisabled}
          className="cursor-pointer"
        />
        {getPagination(pageNumber, pageCount, siblingCount, boundryCount).map((page) => (
          <PaginationItem className={cn(page !== '...' && 'cursor-pointer')}>
            {page === '...' ? (
              <PaginationEllipsis className="size-4" />
            ) : (
              <PaginationLink onClick={() => setPageIndex(page - 1)} isActive={pageNumber === page}>
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationNext
          onClick={() => setPageIndex(pageNumber)}
          disabled={isNextDisabled}
          className="cursor-pointer"
        />
      </PaginationContent>
    </PaginationWrapper>
  );
}

export default Pagination;
