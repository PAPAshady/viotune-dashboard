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
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { useMutation } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';

import FileUploadZone from '@/components/FileUpload/FileUploadZone';
import UploadedFileItem from '@/components/FileUpload/UploadedFileItem';
import FileItem from '@/components/FileUpload/FileItem';
import shcema from '@/schemas/genres.schema';
import { isURL } from '@/utils';
import useGenreSheet from '@/store/genresSheet.store';
import { createGenreMutation, updateGenreMutation } from '@/queries/genres';
import { Spinner } from '@/components/ui/spinner';
import { getDirtyFields } from '@/utils';

function GenreSheet() {
  const open = useGenreSheet((state) => state.open);
  const setOpen = useGenreSheet((state) => state.setOpen);
  const closeSheet = useGenreSheet((state) => state.closeSheet);
  const isEditMode = useGenreSheet((state) => state.isEditMode);
  const genre = useGenreSheet((state) => state.genre); // selected genre to edit

  const defaultValues = {
    title: genre?.title,
    status: genre?.status,
    existingCoverUrl: genre?.cover, // to show the existing cover image in case of edit mode
    description: genre?.description,
  };

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset: resetFields,
    formState: { errors, dirtyFields, isDirty },
    // fill out the form with dynamic in case user wants to edit an album.
  } = useForm({ resolver: zodResolver(shcema), values: isEditMode ? defaultValues : {} });
  const mutation = useMutation(isEditMode ? updateGenreMutation() : createGenreMutation());

  const descriptionLength = +watch('description')?.length;
  const coverFile = watch('coverFile');
  const existingCoverUrl = watch('existingCoverUrl');
  const hasCoverFile = coverFile instanceof FileList && coverFile.length > 0;
  const hasCoverUrl = !hasCoverFile && isURL(existingCoverUrl);

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

    // data to pass to server depending if user wants to edit or upload a genre
    const data = isEditMode ? { modifiedFields, prevGenreData: genre } : formData;

    mutation.mutate(data, { onSuccess: () => onSheetOpenChange(false) });
  };

  return (
    <Sheet open={open} onOpenChange={onSheetOpenChange}>
      <SheetTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          <Plus />
          Create Genre
        </Button>
      </SheetTrigger>
      {/* prevent radix ui from scroling to top if user opened and closed the sheet from a genre on genres table (via dropdown menu) */}
      <SheetContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <form className="flex h-full flex-col" onSubmit={handleSubmit(submitHandler)}>
          <SheetHeader className="border-b">
            <SheetTitle>Create New Genre</SheetTitle>
            <SheetDescription>Add a new genre to your library</SheetDescription>
          </SheetHeader>
          <div className="w-full grow overflow-y-auto p-4 pb-10" style={{ scrollbarWidth: 'thin' }}>
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel>Title</FieldLabel>
                <FieldError>{errors.title?.message}</FieldError>
                <Input
                  aria-invalid={!!errors.title}
                  placeholder="Enter your genre title"
                  {...register('title')}
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
                    name={genre?.cover_path}
                    onRemove={() => setValue('existingCoverUrl', null, { shouldDirty: true })}
                  />
                )}
                {hasCoverFile && (
                  <FileItem file={coverFile[0]} onRemove={() => setValue('coverFile', null)} />
                )}
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <FieldDescription>{200 - descriptionLength} Characters left</FieldDescription>
                <FieldError>{errors.description?.message}</FieldError>
                <Textarea
                  aria-invalid={!!errors.description}
                  placeholder="Enter your genre description"
                  className="max-h-40 min-h-25"
                  maxLength={200}
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
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600"
                disabled={mutation.isPending || !isDirty}
                type="submit"
                size="sm"
              >
                {mutation.isPending ? (
                  <>
                    <Spinner />
                    {isEditMode ? 'Saving changes' : 'Creating genre'}
                  </>
                ) : isEditMode ? (
                  'Save changes'
                ) : (
                  'Create'
                )}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default GenreSheet;
