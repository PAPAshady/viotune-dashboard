import { FieldGroup, Field, FieldLabel, FieldError } from '@components/ui/field';
import { Input } from '@components/ui/input';
import { NativeSelect, NativeSelectOption } from '@components/ui/native-select';
import Dialog from '@/components/Dialogs/Dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  audioFile: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: 'Audio file is required' })
    .refine(
      (files) => {
        const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/aac', 'audio/m4a', 'audio/mp3'];
        return allowedTypes.includes(files[0]?.type);
      },
      { message: 'Use a valid file format (.mp3 .wav .aac .m4a .mpeg)' }
    ),
  cover: z
    .instanceof(FileList)
    .refine(
      (files) => {
        if (files.length === 0) return true; // Cover is optional
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        return allowedTypes.includes(files[0].type);
      },
      { message: 'Use a valid image format (.jpg .jpeg .png)' }
    )
    .optional(),
  genre: z.string().min(1, { message: 'Genre is required' }),
  artist: z.string().optional(),
  album: z.string().optional(),
  releaseDate: z.iso.date({ message: 'Use a valid date' }),
  trackNumber: z.string().optional(),
  lyricsFile: z.instanceof(FileList).optional(),
  status: z.enum(['published', 'draft'], { message: 'Status is required' }),
});

function SongsDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Dialog
      triggerTitle="Upload Song"
      dialogTitle="Add New Song"
      dialogDescription="Upload and configure a new song"
      onSubmit={handleSubmit((data) => console.log('Form submitted:', data))}
    >
      <FieldGroup className="gap-4">
        <Field>
          {errors.title ? (
            <FieldError>{errors.title.message}</FieldError>
          ) : (
            <FieldLabel>Song Title</FieldLabel>
          )}
          <Input
            aria-invalid={!!errors.title}
            {...register('title')}
            placeholder="Enter Song Name"
          />
        </Field>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-3">
          <Field>
            {errors.audioFile ? (
              <FieldError>{errors.audioFile.message}</FieldError>
            ) : (
              <FieldLabel>Audio File</FieldLabel>
            )}
            <Input
              aria-invalid={!!errors.audioFile}
              {...register('audioFile')}
              type="file"
              accept=".mp3, .wav, .aac, .m4a, .mpeg"
            />
          </Field>
          <Field>
            {errors.cover ? (
              <FieldError>{errors.cover.message}</FieldError>
            ) : (
              <FieldLabel>Cover Image (optional)</FieldLabel>
            )}
            <Input
              aria-invalid={!!errors.cover}
              {...register('cover')}
              type="file"
              accept=".jpg, .jpeg, .png"
            />
          </Field>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-3">
          <Field>
            {errors.genre ? (
              <FieldError>{errors.genre.message}</FieldError>
            ) : (
              <FieldLabel>Genre</FieldLabel>
            )}
            <NativeSelect
              aria-invalid={!!errors.genre}
              {...register('genre')}
              className="bg-[#192134]! font-semibold"
            >
              <NativeSelectOption value="">Select Genre</NativeSelectOption>
              <NativeSelectOption value="pop">Pop</NativeSelectOption>
              <NativeSelectOption value="rock">Rock</NativeSelectOption>
              <NativeSelectOption value="jazz">Jazz</NativeSelectOption>
            </NativeSelect>
          </Field>
          <Field>
            {errors.artist ? (
              <FieldError>{errors.artist.message}</FieldError>
            ) : (
              <FieldLabel>Artist (optional)</FieldLabel>
            )}
            <NativeSelect
              aria-invalid={!!errors.artist}
              {...register('artist')}
              className="bg-[#192134]! font-semibold"
            >
              <NativeSelectOption value="">Select Artist</NativeSelectOption>
              <NativeSelectOption value="NF">NF</NativeSelectOption>
              <NativeSelectOption value="Eminem">Eminem</NativeSelectOption>
              <NativeSelectOption value="Rihanna">Rihanna</NativeSelectOption>
            </NativeSelect>
          </Field>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-3">
          <Field>
            {errors.album ? (
              <FieldError>{errors.album.message}</FieldError>
            ) : (
              <FieldLabel>Album (optional)</FieldLabel>
            )}
            <NativeSelect
              aria-invalid={!!errors.album}
              {...register('album')}
              className="bg-[#192134]! font-semibold"
            >
              <NativeSelectOption value="">Select Album</NativeSelectOption>
              <NativeSelectOption value="Album One">Album One</NativeSelectOption>
              <NativeSelectOption value="Album Two">Album Two</NativeSelectOption>
              <NativeSelectOption value="Album Three">Album Three</NativeSelectOption>
            </NativeSelect>
          </Field>
          <Field>
            {errors.releaseDate ? (
              <FieldError>{errors.releaseDate.message}</FieldError>
            ) : (
              <FieldLabel>Release Date</FieldLabel>
            )}
            <Input aria-invalid={!!errors.releaseDate} {...register('releaseDate')} type="date" />
          </Field>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-3">
          <Field>
            {errors.trackNumber ? (
              <FieldError>{errors.trackNumber.message}</FieldError>
            ) : (
              <FieldLabel>Track Number (optional)</FieldLabel>
            )}
            <Input
              aria-invalid={!!errors.trackNumber}
              {...register('trackNumber')}
              type="number"
              placeholder="Enter Track Number"
            />
          </Field>
          <Field>
            {errors.lyricsFile ? (
              <FieldError>{errors.lyricsFile.message}</FieldError>
            ) : (
              <FieldLabel>Lyrics File (optional)</FieldLabel>
            )}
            <Input aria-invalid={!!errors.lyricsFile} {...register('lyricsFile')} type="file" />
          </Field>
        </div>
        <Field className="w-1/2">
          {errors.status ? (
            <FieldError>{errors.status.message}</FieldError>
          ) : (
            <FieldLabel>Status</FieldLabel>
          )}
          <NativeSelect
            aria-invalid={!!errors.status}
            {...register('status')}
            className="bg-[#192134]! font-semibold"
          >
            <NativeSelectOption value="published">Published</NativeSelectOption>
            <NativeSelectOption value="draft">Draft</NativeSelectOption>
          </NativeSelect>
        </Field>
      </FieldGroup>
    </Dialog>
  );
}

export default SongsDialog;
