import { FC } from "react";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationProps {
  setPagination: (newPagination: { skip: number; limit: number }) => void;
  total: number;
  skip: number;
  limit: number;
}

const Pagination: FC<PaginationProps> = ({
  setPagination,
  total,
  skip,
  limit,
}) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * limit;
    setPagination({ skip: newSkip, limit });
    console.log(page);
  };

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </PaginationPrevious>

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages - 1 && <PaginationEllipsis />}

        <PaginationNext onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </PaginationNext>
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default Pagination;
