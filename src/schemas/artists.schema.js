import { z } from 'zod';

export default z.object({
  // requierd fields
  name: z.string().min(1, { message: 'Name is requierd.' }),
  full_name: z.string().min(1, { message: 'Fullname is requierd.' }),
  genre_id: z.uuid({ message: 'Genre is requierd.' }),

  // optional fields
  imageFile: z
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
  existingImageUrl: z.url().nullable().optional(),
  bio: z.string().max(200, { message: 'Bio is too long.' }).optional(),
});
