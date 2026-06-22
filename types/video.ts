import z from "zod";

export const videoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  sport: z.string().min(1, "Sport type is required"),
  year: z.string().min(1, "Year or Season is required"),
  team: z.string().min(1, "Team name is required"),
  gameType: z.string().min(1, "Game type is required"),
  jerseyNumber: z.coerce.number().int().optional(),
  // Ensure default([]) is set cleanly so it infers as a non-optional array
  highlights: z
    .array(
      z.object({
        timestamp: z
          .string()
          .regex(
            /^(?:\d{1,2}:)?\d{1,2}:\d{2}$/,
            "Format must be MM:SS or HH:MM:SS",
          ),
        label: z.string().min(1, "Highlight label is required"),
      }),
    )
    .default([]),
});

export type VideoFormValues = z.infer<typeof videoFormSchema>;
