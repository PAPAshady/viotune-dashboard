import { z } from 'zod';

export default z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  audioFile: z
    .union([z.instanceof(FileList), z.null()])
    .refine((files) => files?.length > 0, { message: 'Audio file is required' })
    .refine(
      (files) => {
        const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/m4a', 'audio/mp3'];
        return allowedTypes.includes(files?.[0]?.type);
      },
      { message: 'Use a valid file format (.mp3 .wav .m4a .mpeg)' }
    ),
  cover: z
    .union([z.instanceof(FileList), z.null()])
    .refine(
      (files) => {
        if (files?.length === 0 || !files) return true; // Cover is optional
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        return allowedTypes.includes(files[0].type);
      },
      { message: 'Use a valid image format (.jpg .jpeg .png)' }
    )
    .optional(),
  genre: z.string().min(1, { message: 'Genre is required' }),
  artist: z.string().optional(),
  album: z.string().optional(),
  release_date: z.iso.date({ message: 'Use a valid date' }),
  track_number: z.string().optional(),
  lyricsFile: z.instanceof(FileList).optional(),
  status: z.enum(['published', 'draft'], { message: 'Status is required' }),
});
