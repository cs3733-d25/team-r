import {Button} from '@/components/ui/button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (count: number) => void;
}

export function PaginationControls({currentPage, totalPages, itemsPerPage, totalItems, onPageChange, onItemsPerPageChange}: PaginationProps) {
    return (
        <div className="flex items-center justify-between mt-4">
            <div className="text-inherit text-muted-foreground">
                Showing {totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}{' '}
                to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                    <span className="text-inherit">Results per page:</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        className="h-8 w-16 rounded-md border px-2"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-inherit">
            Page {currentPage} of {totalPages || 1}
          </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}