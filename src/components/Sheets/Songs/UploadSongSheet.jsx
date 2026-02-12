import { useEffect } from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldSeparator,
  FieldLegend,
  FieldDescription,
} from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';

import FileUploadZone from '@/components/FileUpload/FileUploadZone';
import FileItem from '@/components/FileUpload/FileItem';
import UploadedFileItem from '@/components/FileUpload/UploadedFileItem';
import schema from '@/schemas/songs.schema';
import { uploadSongMutation } from '@/queries/songs';
import useSongSheet from '@/store/songSheet.store';
import { isURL, getDirtyFields } from '@/utils';

function UploadSongSheet({ genres, albums, artists }) {
  const open = useSongSheet((state) => state.open);
  const setOpen = useSongSheet((state) => state.setOpen);
  const closeSheet = useSongSheet((state) => state.closeSheet);
  const isEditMode = useSongSheet((state) => state.isEditMode);
  const song = useSongSheet((state) => state.song); // selected song to edit

  // fill out the form with dynamic default values in case user wants to edit a song.
  const defaultValues = isEditMode
    ? {
        title: song.title,
        release_date: song.release_date,
        track_number: song.track_number,
        status: song.status,
        album: `${song.album_id}|${song.album}`,
        artist: `${song.artist_id}|${song.artist}`,
        genre: song.genre_id,
        existingAudioUrl: song.song_url,
        existingCoverUrl: song.cover,
      }
    : {};

  const {
    register,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
    watch,
    setValue,
    reset: resetFields,
  } = useForm({ resolver: zodResolver(schema), values: defaultValues });
  const { mutateAsync, isPending, reset: resetMutation } = useMutation(uploadSongMutation());

  const coverFile = watch('coverFile');
  const audioFile = watch('audioFile');
  const existingAudioUrl = watch('existingAudioUrl');
  const existingCoverUrl = watch('existingCoverUrl');

  const hasAudioFile = audioFile instanceof FileList && audioFile.length > 0;
  const hasAudioUrl = !hasAudioFile && isURL(existingAudioUrl);

  const hasCoverFile = coverFile instanceof FileList && coverFile.length > 0;
  const hasCoverUrl = !hasCoverFile && isURL(existingCoverUrl);

  const submitHandler = async (data) => {
    if (isEditMode) {
      const modifiedFields = getDirtyFields(data, dirtyFields);
      console.log('edit complete : ', modifiedFields);
    } else {
      await mutateAsync(data, {
        onSuccess: closeSheet,
      });
    }
  };

  //, form values and mutation states when sheet is closed
  useEffect(() => {
    if (!open) {
      closeSheet();
      resetMutation();
      resetFields({});
    }
  }, [open, resetFields, resetMutation, closeSheet]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          <Upload />
          Upload Song
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form className="flex h-full flex-col" onSubmit={handleSubmit(submitHandler)}>
          <SheetHeader className="border-b">
            <SheetTitle>{isEditMode ? `Edit "${song.title}"` : 'Upload New Song'}</SheetTitle>
            <SheetDescription>
              {isEditMode
                ? `You are editing "${song.title}" song.`
                : 'Upload and configure a new song'}
            </SheetDescription>
          </SheetHeader>
          <div className="w-full grow overflow-y-auto p-4 pb-10" style={{ scrollbarWidth: 'thin' }}>
            <FieldGroup>
              <Field>
                <FieldLabel className="text-base">Audio File</FieldLabel>
                <FieldError>{errors.audioFile?.message}</FieldError>
                <FileUploadZone
                  isInvalid={!!errors.audioFile}
                  validFileTypes={['.mp3', '.mpeg', '.wav', '.m4a']}
                  {...register('audioFile')}
                />
                {hasAudioUrl && (
                  <UploadedFileItem
                    fileType="audio"
                    name={song?.audio_path}
                    onRemove={() => setValue('existingAudioUrl', null, { shouldDirty: true })}
                  />
                )}
                {hasAudioFile && (
                  <FileItem file={audioFile[0]} onRemove={() => setValue('audioFile', null)} />
                )}
              </Field>
              <Field>
                <FieldLabel>Song Title</FieldLabel>
                <FieldError>{errors.title?.message}</FieldError>
                <Input
                  aria-invalid={!!errors.title}
                  placeholder="Enter Song Name"
                  {...register('title')}
                />
              </Field>
              <Field>
                <FieldLabel>Genre</FieldLabel>
                <FieldError>{errors.genre?.message}</FieldError>
                <NativeSelect
                  aria-invalid={!!errors.genre}
                  className="bg-[#192134]! font-semibold"
                  {...register('genre')}
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
                <FieldLabel>Release Date</FieldLabel>
                <FieldError>{errors.release_date?.message}</FieldError>
                <Input
                  type="date"
                  aria-invalid={!!errors.release_date}
                  {...register('release_date')}
                />
              </Field>
              <Field>
                <FieldLabel>Status</FieldLabel>
                <FieldError>{errors.status?.message}</FieldError>
                <NativeSelect
                  aria-invalid={!!errors.status}
                  className="bg-[#192134]! font-semibold"
                  {...register('status')}
                >
                  <NativeSelectOption value="published">Published</NativeSelectOption>
                  <NativeSelectOption value="draft">Draft</NativeSelectOption>
                </NativeSelect>
              </Field>
              <FieldSeparator />
              <div>
                <FieldLegend>Optional fields</FieldLegend>
                <FieldDescription>These are fields that do not need any value</FieldDescription>
              </div>
              <Field>
                <FieldLabel className="text-base">Cover Image (optional)</FieldLabel>
                <FieldError>{errors.coverFile?.message}</FieldError>
                <FileUploadZone
                  isInvalid={!!errors.coverFile}
                  validFileTypes={['.jpg', '.jpeg', '.png']}
                  {...register('coverFile')}
                />
                {hasCoverUrl && (
                  <UploadedFileItem
                    fileType="image"
                    url={existingCoverUrl}
                    name={song?.cover_path}
                    onRemove={() => setValue('existingCoverUrl', null, { shouldDirty: true })}
                  />
                )}
                {hasCoverFile && (
                  <FileItem file={coverFile[0]} onRemove={() => setValue('coverFile', null)} />
                )}
              </Field>
              <Field>
                <FieldLabel>Artist (optional)</FieldLabel>
                <FieldError>{errors.artist?.message}</FieldError>
                <NativeSelect
                  aria-invalid={!!errors.artist}
                  className="bg-[#192134]! font-semibold"
                  {...register('artist')}
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
                <FieldLabel>Album (optional)</FieldLabel>
                <FieldError>{errors.album?.message}</FieldError>
                <NativeSelect
                  aria-invalid={!!errors.album}
                  className="bg-[#192134]! font-semibold"
                  {...register('album')}
                >
                  <NativeSelectOption value="">Select Album</NativeSelectOption>
                  {albums?.map((album) => (
                    // pass album.id and album.name together to use them in the submit handler
                    <NativeSelectOption key={album.id} value={`${album.id}|${album.title}`}>
                      {album.title}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel>Track Number (optional)</FieldLabel>
                <FieldError>{errors.track_number?.message}</FieldError>
                <Input
                  type="number"
                  placeholder="Enter Track Number"
                  aria-invalid={!!errors.track_number}
                  {...register('track_number')}
                />
              </Field>
            </FieldGroup>
          </div>
          <SheetFooter className="border-t">
            <div className="flex justify-end gap-3">
              <SheetClose asChild>
                <Button variant="secondary" size="sm">
                  Cancel
                </Button>
              </SheetClose>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600"
                disabled={isPending || !isDirty}
                type="submit"
                size="sm"
              >
                {isPending ? (
                  <>
                    <Spinner />
                    Uploading
                  </>
                ) : isEditMode ? (
                  'Save changes'
                ) : (
                  'Upload'
                )}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default UploadSongSheet;
