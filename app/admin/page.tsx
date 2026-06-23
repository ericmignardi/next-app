import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Trash2, Film, Plus, Shield, ArrowLeft } from "lucide-react";
import { deleteVideo } from "@/actions/actions";
import { UploadForm } from "@/components/admin/upload-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
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
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-[#070a13] min-h-screen text-slate-100 relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Header section with back navigation */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-6 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Archive Manager
          </h1>
          <p className="text-sm text-slate-400">
            Digitize, catalog, and index your historical family sports video library.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="outline" className="border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Vault
            </Button>
          </Link>

          {/* Shadcn Popover Modal wrapper */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/10 rounded-xl text-xs cursor-pointer flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <Plus className="w-4 h-4" /> Upload Footage
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-[#090d19] border border-slate-850 text-slate-100 p-6 rounded-2xl shadow-2xl">
              <DialogHeader className="border-b border-slate-900 pb-4 mb-4">
                <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📹</span> Upload New Video Record
                </DialogTitle>
              </DialogHeader>
              <UploadForm
                onSuccess={async () => {
                  "use server";
                  // Hard reload trigger
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Spreadsheet Style Data Table View */}
      <div className="bg-[#090d19] border border-slate-900 rounded-2xl overflow-hidden shadow-xl relative z-10">
        <Table>
          <TableHeader className="bg-[#0c1322] border-b border-slate-900">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold text-slate-400 w-[260px] text-xs uppercase tracking-wider">
                Video Title
              </TableHead>
              <TableHead className="font-bold text-slate-400 text-xs uppercase tracking-wider">
                Sport
              </TableHead>
              <TableHead className="font-bold text-slate-400 text-xs uppercase tracking-wider">
                Year
              </TableHead>
              <TableHead className="font-bold text-slate-400 text-xs uppercase tracking-wider">
                Team Context
              </TableHead>
              <TableHead className="font-bold text-slate-400 text-xs uppercase tracking-wider">
                Format Type
              </TableHead>
              <TableHead className="font-bold text-slate-400 text-xs uppercase tracking-wider">
                Stream Status
              </TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="text-center py-20 text-slate-500 text-sm"
                >
                  <Film className="w-10 h-10 mx-auto mb-3 text-slate-600 opacity-60" />
                  <p className="font-bold text-slate-400 text-base mb-1">No footage cataloged yet</p>
                  <p className="text-slate-600 text-xs">Click the &quot;Upload Footage&quot; button above to begin.</p>
                </TableCell>
              </TableRow>
            ) : (
              videos.map((video) => {
                const isPending = video.muxPlaybackId.startsWith("pending_");

                return (
                  <TableRow
                    key={video.id}
                    className="hover:bg-[#101626]/40 transition-colors border-b border-slate-900/60"
                  >
                    <TableCell className="font-bold text-white text-sm">
                      {video.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-slate-950 border-slate-800 text-slate-300 capitalize font-medium px-2.5 py-0.5 text-[10px]"
                      >
                        {video.sport}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300 font-medium text-xs">
                      {video.year}
                    </TableCell>
                    <TableCell className="text-slate-300 font-medium text-xs">
                      {video.team}
                    </TableCell>
                    <TableCell className="text-slate-400 font-medium text-xs">
                      {video.gameType}
                    </TableCell>
                    <TableCell>
                      {isPending ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.75 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          Transcoding...
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.75">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Ready to Stream
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
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
                          className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
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
