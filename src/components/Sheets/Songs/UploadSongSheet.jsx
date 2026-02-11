import { useState, useEffect } from 'react';

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
import schema from '@/schemas/songs.schema';
import { uploadSongMutation } from '@/queries/songs';

function UploadSongSheet({ genres, albums, artists }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset: resetFields,
  } = useForm({ resolver: zodResolver(schema) });
  const { mutateAsync, isPending, reset: resetMutation } = useMutation(uploadSongMutation());

  const audioFile = watch('audioFile')?.[0];
  const coverFile = watch('cover')?.[0];

  const submitHandler = async (data) => {
    await mutateAsync(data, {
      onSuccess: () => setOpen(false),
    });
  };

  // reset form values and mutation states when sheet is closed
  useEffect(() => {
    if (!open) {
      resetFields();
      resetMutation();
    }
  }, [open, resetFields, resetMutation]);

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
            <SheetTitle>Add New Song</SheetTitle>
            <SheetDescription>Upload and configure a new song</SheetDescription>
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
                {audioFile && (
                  <FileItem file={audioFile} onRemove={() => setValue('audioFile', null)} />
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
                <FieldError>{errors.cover?.message}</FieldError>
                <FileUploadZone
                  isInvalid={!!errors.cover}
                  validFileTypes={['.jpg', '.jpeg', '.png']}
                  {...register('cover')}
                />
                {coverFile && (
                  <FileItem file={coverFile} onRemove={() => setValue('cover', null)} />
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
                disabled={isPending}
                type="submit"
              >
                {isPending ? (
                  <>
                    <Spinner />
                    Uploading
                  </>
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
