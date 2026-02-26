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
import { useMutation } from '@tanstack/react-query';

import FileUploadZone from '@/components/FileUpload/FileUploadZone';
import UploadedFileItem from '@/components/FileUpload/UploadedFileItem';
import FileItem from '@/components/FileUpload/FileItem';
import shcema from '@/schemas/artists.schema';
import { isURL } from '@/utils';
import useArtistSheet from '@/store/artistsSheet.store';
import { createArtistMutation, updateArtistMutation } from '@/queries/artists';
import { Spinner } from '@/components/ui/spinner';
import { getDirtyFields } from '@/utils';

function ArtistsSheet({ genres }) {
  const open = useArtistSheet((state) => state.open);
  const setOpen = useArtistSheet((state) => state.setOpen);
  const closeSheet = useArtistSheet((state) => state.closeSheet);
  const isEditMode = useArtistSheet((state) => state.isEditMode);
  const artist = useArtistSheet((state) => state.artist); // selected artist to edit

  const defaultValues = {
    name: artist?.name,
    full_name: artist?.full_name,
    existingImageUrl: artist?.image,
    bio: artist?.bio,
    genre_id: artist?.genre_id,
  };

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset: resetFields,
    formState: { errors, dirtyFields, isDirty },
    // fill out the form with dynamic in case user wants to edit an artist.
  } = useForm({ resolver: zodResolver(shcema), values: isEditMode ? defaultValues : {} });
  const mutation = useMutation(isEditMode ? updateArtistMutation() : createArtistMutation());

  const bioLength = +watch('bio')?.length;

  const imageFile = watch('imageFile');
  const existingImageUrl = watch('existingImageUrl');
  const hasImageFile = imageFile instanceof FileList && imageFile.length > 0;
  const hasImageUrl = !hasImageFile && isURL(existingImageUrl);

  const onSheetOpenChange = (isOpen) => {
    if (!isOpen) {
      mutation.reset();
      closeSheet();
      resetFields();
      return;
    }
    setOpen(isOpen);
  };

  const submitHandler = async (formData) => {
    const modifiedFields = getDirtyFields(formData, dirtyFields);

    // data to pass to server depending if user wants to edit or upload a artist
    const data = isEditMode ? { modifiedFields, prevArtistData: artist } : formData;

    mutation.mutate(data, { onSuccess: () => onSheetOpenChange(false) });
  };

  return (
    <Sheet open={open} onOpenChange={onSheetOpenChange}>
      <SheetTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          <Plus /> Add Artist
        </Button>
      </SheetTrigger>
      {/* prevent radix ui from scroling to top if user opened and closed the sheet from a artist on artists table (via dropdown menu) */}
      <SheetContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <form className="flex h-full flex-col" onSubmit={handleSubmit(submitHandler)}>
          <SheetHeader className="border-b">
            <SheetTitle>Add New Artist</SheetTitle>
            <SheetDescription>Add a new artist to your library</SheetDescription>
          </SheetHeader>
          <div className="w-full grow overflow-y-auto p-4 pb-10" style={{ scrollbarWidth: 'thin' }}>
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <FieldError>{errors.name?.message}</FieldError>
                <Input
                  aria-invalid={!!errors.name}
                  placeholder="Enter your artist name"
                  {...register('name')}
                />
              </Field>
              <Field>
                <FieldLabel>Fullname</FieldLabel>
                <FieldError>{errors.full_name?.message}</FieldError>
                <Input
                  aria-invalid={!!errors.full_name}
                  placeholder="Enter your artist fullname"
                  {...register('full_name')}
                />
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
              <FieldSeparator />
              <div>
                <FieldLegend>Optional fields</FieldLegend>
                <FieldDescription>These are fields that do not need any value</FieldDescription>
              </div>
              <Field>
                <FieldLabel className="text-base">Avatar Image (optional)</FieldLabel>
                <FieldError>{errors.imageFile?.message}</FieldError>
                <FileUploadZone
                  isInvalid={!!errors.imageFile}
                  validFileTypes={['.jpg', '.jpeg', '.png']}
                  {...register('imageFile')}
                />
                {hasImageUrl && (
                  <UploadedFileItem
                    fileType="image"
                    url={existingImageUrl}
                    name={artist?.avatar_path}
                    onRemove={() => setValue('existingImageUrl', null, { shouldDirty: true })}
                  />
                )}
                {hasImageFile && (
                  <FileItem file={imageFile[0]} onRemove={() => setValue('imageFile', null)} />
                )}
              </Field>

              <Field>
                <FieldLabel>Bio</FieldLabel>
                <FieldDescription>{100 - bioLength} Characters left</FieldDescription>
                <FieldError>{errors.bio?.message}</FieldError>
                <Textarea
                  aria-invalid={!!errors.bio}
                  placeholder="Enter bio"
                  className="max-h-40 min-h-25"
                  maxLength={100}
                  {...register('bio')}
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
                disabled={mutation.isPending || !isDirty}
                type="submit"
                size="sm"
              >
                {mutation.isPending ? (
                  <>
                    <Spinner />
                    {isEditMode ? 'Saving changes' : 'Adding artist'}
                  </>
                ) : isEditMode ? (
                  'Save changes'
                ) : (
                  'Add'
                )}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default ArtistsSheet;
