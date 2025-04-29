import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from '@/components/ui/table';
import React from 'react';

interface SortableColumn<T> {
    field: keyof T | string;
    header: string;
    sortable?: boolean;
    cellRenderer?: (item: T) => React.ReactNode;
}

interface SortableTableProps<T> {
    columns: SortableColumn<T>[];
    data: T[];
    sortField: string | null;
    sortDirection: 'asc' | 'desc';
    onSort: (field: string) => void;
}


export function SortableTable<T extends Record<string, unknown>>({ columns, data, sortField, sortDirection, onSort }: SortableTableProps<T>) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead
                            key={String(column.field)}
                            className={`text-center ${column.sortable ? 'cursor-pointer hover:bg-muted/50' : ''}`}
                            onClick={column.sortable ? () => onSort(String(column.field)) : undefined}
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
                            <TableCell key={String(column.field)}>
                                {column.cellRenderer
                                    ? column.cellRenderer(item)
                                    : item[column.field as keyof T] as React.ReactNode}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}