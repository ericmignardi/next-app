import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Plus, Shield, ArrowLeft } from "lucide-react";
import { refreshAdmin } from "@/actions/actions";
import { UploadForm } from "@/components/admin/upload-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DataTable } from "@/components/admin/data-table";

export const unstable_instant = false;

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

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
                onSuccess={refreshAdmin}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Data Table Component */}
      <DataTable videos={videos} />
    </div>
  );
}
