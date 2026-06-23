"use client";

import React, { useState, useTransition } from "react";
import { deleteVideo } from "@/actions/actions";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteConfirmationProps {
  videoId: string;
  muxAssetId: string;
}

export function DeleteConfirmation({ videoId, muxAssetId }: DeleteConfirmationProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteVideo(videoId, muxAssetId);
        toast.success("Video deleted successfully");
        setOpen(false);
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete video");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-650 hover:bg-red-500/10 cursor-pointer ml-2"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-[#090d19] border border-slate-800 text-slate-100 p-6 rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
            ⚠️ Delete Video Record
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm mt-2">
            Are you sure you want to permanently delete this video archive? This will also remove the video stream from Mux. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
            className="border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-750 text-white font-semibold flex items-center gap-1.5"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Deleting...
              </>
            ) : (
              "Yes, Delete Video"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
