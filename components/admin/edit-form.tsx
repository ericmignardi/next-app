"use client";

import { useForm, useFieldArray, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { videoFormSchema, VideoFormValues } from "@/types/video";
import { updateVideo } from "@/actions/actions";
import { toast } from "sonner";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditFormProps {
  video: {
    id: string;
    title: string;
    description?: string | null;
    sport: string;
    year: string;
    team: string;
    gameType: string;
    jerseyNumber?: number | null;
    highlights?: {
      timestamp: string;
      label: string;
    }[] | null;
  };
  onSuccess: () => void;
}

export function EditForm({ video, onSuccess }: EditFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema) as Resolver<VideoFormValues>,
    defaultValues: {
      title: video.title,
      description: video.description ?? "",
      sport: video.sport,
      year: video.year,
      team: video.team,
      gameType: video.gameType,
      jerseyNumber: video.jerseyNumber ?? undefined,
      highlights: (video.highlights ?? []).map((h) => ({
        timestamp: h.timestamp,
        label: h.label,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const onSubmit = async (values: VideoFormValues) => {
    startTransition(async () => {
      try {
        await updateVideo(video.id, {
          ...values,
          highlights: values.highlights ?? [],
        });
        toast.success("Video archive updated successfully.");
        onSuccess();
      } catch (err) {
        console.error("Update process caught an exception:", err);
        toast.error("Something went wrong while updating the archive.");
      }
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl bg-transparent p-0 border-none shadow-none text-slate-100"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-350 font-medium">Title</Label>
          <Input
            {...form.register("title")}
            placeholder="1998 Finals Game 7"
            disabled={isPending}
            className="bg-slate-900 border-slate-800 focus:border-blue-500 text-white rounded-xl"
          />
          {form.formState.errors.title && (
            <p className="text-xs text-red-500">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-slate-350 font-medium">Sport</Label>
          <Input
            {...form.register("sport")}
            placeholder="Hockey"
            disabled={isPending}
            className="bg-slate-900 border-slate-800 focus:border-blue-500 text-white rounded-xl"
          />
          {form.formState.errors.sport && (
            <p className="text-xs text-red-500">
              {form.formState.errors.sport.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-350 font-medium">Description</Label>
        <Input
          {...form.register("description")}
          placeholder="Enter a brief summary..."
          disabled={isPending}
          className="bg-slate-900 border-slate-800 focus:border-blue-500 text-white rounded-xl"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-350 font-medium">Year / Season</Label>
          <Input
            {...form.register("year")}
            placeholder="1998"
            disabled={isPending}
            className="bg-slate-900 border-slate-800 focus:border-blue-500 text-white rounded-xl"
          />
          {form.formState.errors.year && (
            <p className="text-xs text-red-500">
              {form.formState.errors.year.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-slate-350 font-medium">Team Name</Label>
          <Input
            {...form.register("team")}
            placeholder="Ancaster Rangers"
            disabled={isPending}
            className="bg-slate-900 border-slate-800 focus:border-blue-500 text-white rounded-xl"
          />
          {form.formState.errors.team && (
            <p className="text-xs text-red-500">
              {form.formState.errors.team.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-slate-350 font-medium">Game Type</Label>
          <Input
            {...form.register("gameType")}
            placeholder="Playoffs"
            disabled={isPending}
            className="bg-slate-900 border-slate-800 focus:border-blue-500 text-white rounded-xl"
          />
          {form.formState.errors.gameType && (
            <p className="text-xs text-red-500">
              {form.formState.errors.gameType.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-350 font-medium">Jersey Number (Optional)</Label>
        <Input
          type="number"
          {...form.register("jerseyNumber")}
          placeholder="e.g. 99"
          disabled={isPending}
          className="bg-slate-900 border-slate-800 focus:border-blue-500 text-white rounded-xl"
        />
      </div>

      {/* Dynamic Highlight Array Blocks */}
      <div className="space-y-4 pt-2 border-t border-slate-800/80">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-semibold text-slate-350">
            Game Highlights / Markers
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ timestamp: "00:00", label: "" })}
            disabled={isPending}
            className="border-slate-850 bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Highlight
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              {...form.register(`highlights.${index}.timestamp` as const)}
              placeholder="MM:SS"
              className="w-24 bg-slate-900 border-slate-850 text-white rounded-xl"
              disabled={isPending}
            />
            <Input
              {...form.register(`highlights.${index}.label` as const)}
              placeholder="Goal scored"
              className="flex-1 bg-slate-900 border-slate-850 text-white rounded-xl"
              disabled={isPending}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              className="text-red-500 hover:text-red-600 hover:bg-red-500/10 cursor-pointer"
              disabled={isPending}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-11" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving Changes...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
}
