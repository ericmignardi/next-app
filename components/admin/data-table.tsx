"use client";

import React from 'react';
import { type VideoModel as Video } from '@/generated/prisma/models';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { columns } from '@/components/admin/columns';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DeleteConfirmation } from '@/components/admin/delete-confirmation';
import { EditForm } from '@/components/admin/edit-form';
import { bulkDeleteVideos } from '@/actions/bulk-actions';
import { toast } from 'sonner';

interface DataTableProps {
  videos: Video[];
}

export function DataTable({ videos }: DataTableProps) {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [editingVideo, setEditingVideo] = React.useState<Video | null>(null);

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
      setSelectedIds([]);
      // Refresh to fetch updated list
      window.location.reload();
    } catch (e) {
      toast.error('Failed to delete videos');
    }
  };

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <Button variant="destructive" onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-750 text-white rounded-xl shadow-lg font-bold">
          Delete Selected ({selectedIds.length})
        </Button>
      )}
      <div className="rounded-2xl border border-slate-900 bg-slate-950 overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-slate-900/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-slate-900 hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan} className="text-slate-400 font-bold text-xs uppercase tracking-wider py-4">
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
              <TableRow key={row.id} className="border-slate-900 hover:bg-slate-900/10">
                {/* Selection checkbox */}
                <TableCell className="py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(row.original.id)}
                    onChange={(e) => handleSelect(row.original.id, e.target.checked)}
                    className="w-4 h-4 rounded border-slate-800 text-blue-600 focus:ring-blue-500/20 bg-slate-900 cursor-pointer"
                  />
                </TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-4 text-slate-350">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {/* Actions column */}
                <TableCell className="py-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingVideo(row.original)}
                    className="border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white rounded-xl cursor-pointer text-xs"
                  >
                    Edit
                  </Button>
                  <DeleteConfirmation videoId={row.original.id} muxAssetId={row.original.muxAssetId} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Controlled Edit Dialog */}
      <Dialog open={editingVideo !== null} onOpenChange={(open) => { if (!open) setEditingVideo(null); }}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-[#090d19] border border-slate-850 text-slate-100 p-6 rounded-2xl shadow-2xl">
          <DialogHeader className="border-b border-slate-900 pb-4 mb-4">
            <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
              <span>✍️</span> Edit Video Record
            </DialogTitle>
          </DialogHeader>
          {editingVideo && (
            <EditForm
              video={editingVideo}
              onSuccess={() => {
                setEditingVideo(null);
                window.location.reload();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
