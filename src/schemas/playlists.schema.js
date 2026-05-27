import { z } from 'zod';

export default z.object({
  // required fields
  title: z.string().min(1, 'Title is required'),
  visibility: z.enum(['1', '0'], { message: 'Visibility is required' }),

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
