import { z } from 'zod';
import useSongSheet from '@/store/songSheet.store';

export default z
  .object({
    title: z.string().min(1, { message: 'Title is required' }),
    audioFile: z
      .union([z.instanceof(FileList), z.null(), z.undefined()])
      .refine(
        (audio) => {
          const isEditMode = useSongSheet.getState().isEditMode;
          // audio file is optional in edit mode because user have uploaded an audio file before.
          if (isEditMode && audio?.length === 0) return true;
          return audio?.length > 0;
        },
        { message: 'Audio file is required' }
      )
      .refine(
        (audio) => {
          const isEditMode = useSongSheet.getState().isEditMode;
          // audio file is optional in edit mode because user have uploaded an audio file before.
          if (isEditMode && audio?.length === 0) return true;
          const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/m4a', 'audio/mp3'];
          return allowedTypes.includes(audio?.[0]?.type);
        },
        { message: 'Use a valid file format (.mp3 .wav .m4a .mpeg)' }
      ),
    coverFile: z
      .instanceof(FileList)
      .nullable()
      .refine(
        (files) => {
          if (!files || files?.length === 0) return true; // Cover is optional
          const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
          return allowedTypes.includes(files[0].type);
        },
        { message: 'Use a valid image format (.jpg .jpeg .png)' }
      )
      .optional(),
    existingAudioUrl: z.url().nullable().optional(),
    existingCoverUrl: z.url().nullable().optional(),
    genre_id: z.uuid({ message: 'Genre is required' }),
    artist: z.string().optional(),
    album: z.string().optional(),
    release_date: z.iso.date({ message: 'Use a valid date' }),
    // track_number can be both string and number (number in edit mode because that's what server sends to us)
    track_number: z.union([z.string(), z.null(), z.number()]).optional(),
    status: z.enum(['published', 'draft'], { message: 'Status is required' }),
  })
  // make sure the audio always exists, wether its a new audio file or the existing audio url
  .superRefine((data, ctx) => {
    const hasNewAudioFile =
      data.audioFile && data.audioFile instanceof FileList && data.audioFile.length > 0;
    const hasExistingAudioUrl =
      typeof data.existingAudioUrl === 'string' && data.existingAudioUrl.length > 0;

    if (!hasNewAudioFile && !hasExistingAudioUrl) {
      return ctx.addIssue({
        code: 'custom',
        path: ['audioFile'],
        message: 'Audio is required (upload a file or keep the existing one)',
      });
    }
    return true;
  });
