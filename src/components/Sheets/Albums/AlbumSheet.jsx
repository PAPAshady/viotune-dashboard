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
import { Plus } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

import FileUploadZone from '@/components/FileUpload/FileUploadZone';
import UploadedFileItem from '@/components/FileUpload/UploadedFileItem';
import FileItem from '@/components/FileUpload/FileItem';
import shcema from '@/schemas/albums.schema';
import { isURL } from '@/utils';
import useAlbumSheet from '@/store/albumsSheet.store';

function AddAlbumSheet({ artists, genres }) {
  const open = useAlbumSheet((state) => state.open);
  const setOpen = useAlbumSheet((state) => state.setOpen);
  const closeSheet = useAlbumSheet((state) => state.closeSheet);
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset: resetFields,
    formState: { errors },
  } = useForm({ resolver: zodResolver(shcema) });

  const submitHandler = async (data) => {
    console.log(data);
  };

  const descriptionLength = +watch('description')?.length;

  const coverFile = watch('coverFile');
  const existingCoverUrl = watch('existingCoverUrl');
  const hasCoverFile = coverFile instanceof FileList && coverFile.length > 0;
  const hasCoverUrl = !hasCoverFile && isURL(existingCoverUrl);

  const onSheetOpenChange = (isOpen) => {
    if (!isOpen) {
      resetFields({});
      closeSheet();
      return;
    }
    setOpen(isOpen);
  };

  return (
    <Sheet open={open} onOpenChange={onSheetOpenChange}>
      <SheetTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          <Plus />
          Create Album
        </Button>
      </SheetTrigger>
      {/* prevent radix ui from scroling to top if user opened and closed the sheet from a song on songs table (via dropdown menu) */}
      <SheetContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <form className="flex h-full flex-col" onSubmit={handleSubmit(submitHandler)}>
          <SheetHeader className="border-b">
            <SheetTitle>Create New Album</SheetTitle>
            <SheetDescription>Add a new album to your library</SheetDescription>
          </SheetHeader>
          <div className="w-full grow overflow-y-auto p-4 pb-10" style={{ scrollbarWidth: 'thin' }}>
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel>Title</FieldLabel>
                <FieldError>{errors.title?.message}</FieldError>
                <Input
                  aria-invalid={!!errors.title}
                  placeholder="Enter your album title"
                  {...register('title')}
                />
              </Field>
              <Field>
                <FieldLabel>Artist</FieldLabel>
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
                <FieldLabel>Genre</FieldLabel>
                <FieldError>{errors.genre_id?.message}</FieldError>
                <NativeSelect
                  aria-invalid={!!errors.genre_id}
                  className="bg-[#192134]! font-semibold"
                  {...register('genre_id')}
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
                    // name={album?.cover_path}
                    onRemove={() => setValue('existingCoverUrl', null, { shouldDirty: true })}
                  />
                )}
                {hasCoverFile && (
                  <FileItem file={coverFile[0]} onRemove={() => setValue('coverFile', null)} />
                )}
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <FieldDescription>{100 - descriptionLength} Characters left</FieldDescription>
                <FieldError>{errors.description?.message}</FieldError>
                <Textarea
                  aria-invalid={!!errors.description}
                  placeholder="Enter your album description"
                  className="max-h-40 min-h-25"
                  maxLength={100}
                  {...register('description')}
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
              <Button className="bg-blue-500 text-white hover:bg-blue-600" type="submit" size="sm">
                Create
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default AddAlbumSheet;
