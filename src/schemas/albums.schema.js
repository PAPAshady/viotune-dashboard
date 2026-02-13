import { z } from 'zod';

export default z.object({
  // requierd fields

  title: z.string().min(1, { message: 'Title is requierd.' }),
  artist: z.string().min(1, { message: 'Artist is requierd.' }),
  genre_id: z.uuid({ message: 'Genre is required.' }),
  release_date: z.iso.date({ message: 'Use a valid date.' }),
  status: z.enum(['published', 'draft'], { message: 'Status is required' }),

  // optional fields

  coverFile: z
    .instanceof(FileList)
    .nullable()
    .optional()
    .refine(
      (files) => {
        if (!files || files?.length === 0) return true; // Cover is optional
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        return allowedTypes.includes(files[0].type);
      },
      { message: 'Use a valid image format (.jpg .jpeg .png)' }
    ),
  existingCoverUrl: z.url().nullable().optional(),
  description: z.string().max(100, { message: 'Description is too long.' }).optional(),
});
