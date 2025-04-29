import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from '@/components/ui/table';

interface SortableColumn {
    field: string;
    header: string;
    sortable?: boolean;
    cellRenderer?: (item: any) => React.ReactNode;
}

interface SortableTableProps {
    columns: SortableColumn[];
    data: any[];
    sortField: string | null;
    sortDirection: 'asc' | 'desc';
    onSort: (field: string) => void;
}

export function SortableTable({ columns, data, sortField, sortDirection, onSort, }: SortableTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead
                            key={column.field}
                            className={`text-center ${column.sortable ? 'cursor-pointer hover:bg-muted/50' : ''}`}
                            onClick={column.sortable ? () => onSort(column.field) : undefined}
                        >
                            <div className="flex items-center justify-center gap-1">
                                {column.header}
                                {column.sortable && sortField === column.field && (
                                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                )}
                            </div>
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody className="text-center">
                {data.map((item, index) => (
                    <TableRow key={index} className="border-t">
                        {columns.map((column) => (
                            <TableCell key={column.field}>
                                {column.cellRenderer ? column.cellRenderer(item) : item[column.field]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}