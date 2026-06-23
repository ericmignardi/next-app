import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { type VideoModel as Video } from '@/generated/prisma/models'; // Prisma client type
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Video>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Title <ArrowUpDown size={12} />
      </div>
    ),
  },
  {
    accessorKey: 'sport',
    header: 'Sport',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="bg-slate-950 border-slate-800 text-slate-300 capitalize font-medium px-2.5 py-0.5 text-[10px]"
      >
        {row.original.sport}
      </Badge>
    ),
  },
  {
    accessorKey: 'year',
    header: 'Year',
  },
  {
    accessorKey: 'team',
    header: 'Team',
  },
  {
    accessorKey: 'gameType',
    header: 'Format',
  },
  {
    accessorKey: 'muxPlaybackId',
    header: 'Status',
    cell: ({ row }) => {
      const pending = row.original.muxPlaybackId?.startsWith('pending_');
      return pending ? (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.75 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Transcoding...
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.75">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Ready to Stream
        </span>
      );
    },
  },
];
