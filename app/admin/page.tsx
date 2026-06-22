import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Trash2, Film, Plus } from "lucide-react";
import { deleteVideo } from "@/actions/actions";
import { UploadForm } from "@/components/admin/upload-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const revalidate = 0; // Absolute dynamic serving to bypass cache lags

export default async function AdminPage() {
  const { userId } = await auth();

  // Pull existing videos sorted by date
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
    include: { highlights: true },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 bg-slate-50/50 min-h-screen">
      <div className="flex justify-between items-center border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Archive Manager
          </h1>
          <p className="text-sm text-slate-500">
            Manage your historical video storage and asset indexes.
          </p>
        </div>

        {/* Shadcn Popover Modal wrapper for our Axios upload form */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-colors">
              <Plus className="w-4 h-4 mr-2" /> Upload Game Footage
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-white p-6 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Upload New Video Record
              </DialogTitle>
            </DialogHeader>
            {/* Hard reload on complete to populate server records instantly */}
            <UploadForm
              onSuccess={() => {
                window.location.reload();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Spreadsheet Style Data Table View */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-700 w-[240px]">
                Video Title
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Sport
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Year
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Team Context
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Format Type
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Stream Status
              </TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-slate-400 text-sm"
                >
                  <Film className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  No sports videos cataloged yet.
                </TableCell>
              </TableRow>
            ) : (
              videos.map((video) => {
                const isPending = video.muxPlaybackId.startsWith("pending_");

                return (
                  <TableRow
                    key={video.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <TableCell className="font-medium text-slate-900">
                      {video.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-slate-50 border-slate-200 text-slate-700 capitalize font-normal px-2.5 py-0.5"
                      >
                        {video.sport}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">
                      {video.year}
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">
                      {video.team}
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">
                      {video.gameType}
                    </TableCell>
                    <TableCell>
                      {isPending ? (
                        <span className="inline-flex items-center text-xs font-medium text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-0.5 animate-pulse">
                          Transcoding...
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5">
                          Ready to Stream
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {/* Server Action trigger directly bound inline to clean button markup */}
                      <form
                        action={deleteVideo.bind(
                          null,
                          video.id,
                          video.muxAssetId,
                        )}
                      >
                        <Button
                          type="submit"
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
