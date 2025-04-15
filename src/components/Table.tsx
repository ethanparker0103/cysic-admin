import React, { ReactNode } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, SortDescriptor } from "@nextui-org/react";

export interface CysicTableColumn<T> {
  key: string;
  label: ReactNode;
  width?: string | number;
  sortable?: boolean;
  renderCell?: (item: T) => ReactNode;
}

interface CysicTableProps<T> {
  data: T[];
  columns: CysicTableColumn<T>[];
  className?: string;
  sortable?: boolean;
  initialSorting?: SortDescriptor;
  onSortChange?: (descriptor: SortDescriptor) => void;
  emptyContent?: ReactNode;
  onRowClick?: (item: T) => void;
  keyExtractor?: (item: T) => string | number;
}

const CysicTable = <T extends object>({
  data,
  columns,
  className = "",
  sortable = false,
  initialSorting,
  onSortChange,
  emptyContent = "No data to display",
  onRowClick,
  keyExtractor = (item: any) => item.id || Math.random().toString(),
}: CysicTableProps<T>) => {
  return (
    <Table
      aria-label="Cysic custom table"
      className={`${className}`}
      isHeaderSticky
      isStriped={false}
      sortDescriptor={initialSorting}
      onSortChange={onSortChange}
      selectionMode="none"
      classNames={{
        wrapper: 'px-0 !bg-[transparent]',
        th: '!bg-[#151515] !font-[300]',
      }}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn 
            key={column.key} 
            allowsSorting={sortable && column.sortable}
            className="bg-black/50 text-sub uppercase text-sm py-2"
          >
            {column.label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody items={data} emptyContent={emptyContent}>
        {(item) => (
          <TableRow 
            key={keyExtractor(item)} 
            className="border-b border-white/5 last:border-b-0"
            onClick={onRowClick ? () => onRowClick(item) : undefined}
          >
            {(columnKey) => {
              const column = columns.find(col => col.key === columnKey);
              return (
                <TableCell className="text-white py-4">
                  {column?.renderCell ? column.renderCell(item) : (item as any)[columnKey]}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CysicTable;