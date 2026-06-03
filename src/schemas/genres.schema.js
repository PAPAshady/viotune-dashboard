import { z } from 'zod';

export const tagSchema = z
  .string()
  .trim()
  .regex(/^[a-zA-Z0-9-]+$/, { message: 'Only letters, numbers, and hyphens are allowed.' })
  .min(2, { message: 'Tag must be at least 2 characters.' })
  .max(20, { message: 'Tag must be at most 20 characters.' });

export default z.object({
  // requierd fields
  title: z.string().min(1, { message: 'Title is requierd.' }),
  status: z.enum(['published', 'draft'], { message: 'Status is required' }),
  tags: z
    .array(tagSchema, { message: 'At least one tag is required.' })
    .max(3, { message: 'You can only add up to 3 tags.' })
    .min(1, { message: 'Add at least 1 tag.' }),

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
