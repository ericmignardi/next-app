"use client";

import { useState } from "react";
import { useForm, useFieldArray, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { videoFormSchema, VideoFormValues } from "@/types/video";
import { initializeVideoUpload } from "@/actions/actions";
import axiosInstance from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UploadForm({ onSuccess }: { onSuccess: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema) as Resolver<VideoFormValues>,
    defaultValues: {
      title: "",
      description: "",
      sport: "",
      year: "",
      team: "",
      gameType: "",
      jerseyNumber: undefined,
      highlights: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const onSubmit = async (values: VideoFormValues) => {
    if (!file) return alert("Please select a video file first");
    setIsUploading(true);

    try {
      // 1. Fetch your upload endpoint configurations
      const response = await initializeVideoUpload(values);

      // 2. Explicitly guard against an undefined or missing uploadUrl
      if (!response || !response.uploadUrl) {
        throw new Error(
          "Failed to retrieve a valid secure upload destination from Mux.",
        );
      }

      const { uploadUrl } = response; // TypeScript now knows with 100% certainty this is a string

      // 3. Stream raw file binary straight to Mux using Axios safely
      await axiosInstance.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setUploadProgress(percentage);
          }
        },
      });

      setIsUploading(false);
      setUploadProgress(0);
      setFile(null);
      form.reset();
      onSuccess();
      alert(
        "Video upload running in background! It will appear on your dashboard shortly.",
      );
    } catch (err) {
      console.error("Upload process caught an exception:", err);
      setIsUploading(false);
      alert("Something went wrong during file processing.");
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl bg-transparent p-0 border-none shadow-none"
    >
      <div className="space-y-2">
        <Label htmlFor="video-file">Video File</Label>
        <Input
          id="video-file"
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          disabled={isUploading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            {...form.register("title")}
            placeholder="1998 Finals Game 7"
            disabled={isUploading}
          />
          {form.formState.errors.title && (
            <p className="text-xs text-red-500">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Sport</Label>
          <Input
            {...form.register("sport")}
            placeholder="Hockey"
            disabled={isUploading}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Year / Season</Label>
          <Input
            {...form.register("year")}
            placeholder="1998"
            disabled={isUploading}
          />
        </div>
        <div className="space-y-2">
          <Label>Team Name</Label>
          <Input
            {...form.register("team")}
            placeholder="Ancaster Rangers"
            disabled={isUploading}
          />
        </div>
        <div className="space-y-2">
          <Label>Game Type</Label>
          <Input
            {...form.register("gameType")}
            placeholder="Playoffs"
            disabled={isUploading}
          />
        </div>
      </div>

      {/* Dynamic Highlight Array Blocks */}
      <div className="space-y-4 pt-2 border-t border-slate-800/80">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-semibold text-slate-300">
            Game Highlights / Markers
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ timestamp: "00:00", label: "" })}
            disabled={isUploading}
            className="border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Highlight
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              {...form.register(`highlights.${index}.timestamp` as const)}
              placeholder="MM:SS"
              className="w-24"
              disabled={isUploading}
            />
            <Input
              {...form.register(`highlights.${index}.label` as const)}
              placeholder="Winning Goal scored"
              className="flex-1"
              disabled={isUploading}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              className="text-red-500 hover:text-red-600"
              disabled={isUploading}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {isUploading && (
        <div className="space-y-2">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 text-right">
            {uploadProgress}% uploaded directly to streaming node...
          </p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isUploading}>
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Streaming
            Binary...
          </>
        ) : (
          "Upload & Save Video Archive"
        )}
      </Button>
    </form>
  );
}
