import React, { ReactNode } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, SortDescriptor } from "@nextui-org/react";
import Spinner from "@/components/spinner";

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
  loading?: boolean;
}

const CysicTable = <T extends object>({
  loading,
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
      shadow="none"
      aria-label="Cysic custom table"
      className={`${className} [&>div]:p-0 `}
      isHeaderSticky
      isStriped={false}
      sortDescriptor={initialSorting}
      onSortChange={onSortChange}
      selectionMode="none"
      classNames={{
        wrapper: 'px-0 !bg-[transparent]',
        th: '!bg-[#151515] !font-light [&:last-of-type]:!text-right',
        td: '[&:last-of-type]:!text-right',
      }}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn 
            key={column.key} 
            allowsSorting={sortable && column.sortable}
            className="bg-black/50 text-sub  text-sm py-2"
          >
            {column.label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody isLoading={loading} loadingContent={<Spinner />} items={data} emptyContent={emptyContent}>
        {(item) => (
          <TableRow 
            key={keyExtractor(item)} 
            className="border-b border-white/5 last:border-b-0"
            onClick={onRowClick ? () => onRowClick(item) : undefined}
          >
            {(columnKey) => {
              const column = columns.find(col => col.key === columnKey);
              return (
                <TableCell className="text-white py-4 teacher text-sm !normal-case">
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