import { z } from 'zod';

export default z.object({
  // requierd fields
  title: z.string().min(1, { message: 'Title is requierd.' }),
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
  description: z.string().max(200, { message: 'Description is too long.' }).optional(),
});
