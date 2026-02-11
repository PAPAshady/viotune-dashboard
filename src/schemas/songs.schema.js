import { z } from 'zod';

export default z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  audioFile: z
    .union([z.instanceof(FileList), z.null(), z.string()])
    .refine(
      (audio) => {
        if (typeof audio === 'string') return true;
        return audio?.length > 0;
      },
      { message: 'Audio file is required' }
    )
    .refine(
      (audio) => {
        if (typeof audio === 'string') return true;
        const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/m4a', 'audio/mp3'];
        return allowedTypes.includes(audio?.[0]?.type);
      },
      { message: 'Use a valid file format (.mp3 .wav .m4a .mpeg)' }
    ),
  cover: z
    .union([z.instanceof(FileList), z.null(), z.string()])
    .refine(
      (files) => {
        // Cover is optional and can be type of string in edit mode (url)
        if (files?.length === 0 || !files || typeof files === 'string') return true;
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
  track_number: z.union([z.string(), z.null(), z.number()]).optional(), // track_number can be both string and number (number in edit mode because that's what server sends to us)
  lyricsFile: z.instanceof(FileList).optional(),
  status: z.enum(['published', 'draft'], { message: 'Status is required' }),
});
