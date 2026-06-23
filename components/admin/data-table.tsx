import React from 'react';
import { type VideoModel as Video } from '@/generated/prisma/models';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { columns } from '@/components/admin/columns';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DeleteConfirmation } from '@/components/admin/delete-confirmation';
import { bulkDeleteVideos } from '@/actions/bulk-actions';
import { toast } from 'sonner';

interface DataTableProps {
  videos: Video[];
}

export function DataTable({ videos }: DataTableProps) {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const table = useReactTable({
    data: videos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnVisibility: {},
    },
  });

  const handleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((v) => v !== id),
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error('No videos selected for deletion');
      return;
    }
    try {
      await bulkDeleteVideos(selectedIds);
      toast.success('Deleted selected videos');
      // Optionally trigger revalidation - could be done inside bulkDeleteVideos
    } catch (e) {
      toast.error('Failed to delete videos');
    }
  };

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <Button variant="destructive" onClick={handleBulkDelete}>
          Delete Selected ({selectedIds.length})
        </Button>
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {/* Selection checkbox */}
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(row.original.id)}
                  onChange={(e) => handleSelect(row.original.id, e.target.checked)}
                />
              </TableCell>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
              {/* Actions column */}
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Video</DialogTitle>
                    </DialogHeader>
                    {/* Placeholder for edit form – could import EditForm component */}
                    <p className="text-sm text-muted-foreground">Edit form goes here.</p>
                  </DialogContent>
                </Dialog>
                <DeleteConfirmation videoId={row.original.id} muxAssetId={row.original.muxAssetId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
