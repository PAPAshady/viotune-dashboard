import { useState } from 'react';

import { FieldGroup, Field, FieldLabel, FieldError } from '@components/ui/field';
import { Input } from '@components/ui/input';
import { NativeSelect, NativeSelectOption } from '@components/ui/native-select';
import Dialog from '@/components/Dialogs/Dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import schema from '@/schemas/songs.schema';
import { uploadSongMutation } from '@/queries/songs';

function SongsDialog({ genres, artists, albums }) {
  const [open, setOpen] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutateAsync, isPending } = useMutation(uploadSongMutation());

  const submitHandler = async (data) => {
    await mutateAsync(data, { onSuccess: () => setOpen(false) });
  };

  return (
    <Dialog
      triggerTitle="Upload Song"
      dialogTitle="Add New Song"
      dialogDescription="Upload and configure a new song"
      onSubmit={handleSubmit(submitHandler)}
      isPending={isPending}
      open={open}
      onOpenChange={setOpen}
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
            className="cursor-pointer"
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
            className="cursor-pointer"
            accept=".jpg, .jpeg, .png"
          />
        </Field>
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
            {genres?.map((genre) => (
              <NativeSelectOption key={genre.id} value={genre.id}>
                {genre.title}
              </NativeSelectOption>
            ))}
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
            {artists?.map((artist) => (
              // pass artist.id and artist.name together to use them in the submit handler
              <NativeSelectOption key={artist.id} value={`${artist.id}|${artist.name}`}>
                {artist.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
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
            {albums?.map((album) => (
              // pass album.id and album.title together to use them in the submit handler
              <NativeSelectOption key={album.id} value={`${album.id}|${album.title}`}>
                {album.title} - {album.artist}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
        <Field>
          {errors.release_date ? (
            <FieldError>{errors.release_date.message}</FieldError>
          ) : (
            <FieldLabel>Release Date</FieldLabel>
          )}
          <Input aria-invalid={!!errors.release_date} {...register('release_date')} type="date" />
        </Field>
        <Field>
          {errors.track_number ? (
            <FieldError>{errors.track_number.message}</FieldError>
          ) : (
            <FieldLabel>Track Number (optional)</FieldLabel>
          )}
          <Input
            aria-invalid={!!errors.track_number}
            {...register('track_number')}
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
          <Input
            aria-invalid={!!errors.lyricsFile}
            {...register('lyricsFile')}
            type="file"
            className="cursor-pointer"
          />
        </Field>
        <Field>
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
