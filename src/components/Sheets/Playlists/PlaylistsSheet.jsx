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
import { Textarea } from '@/components/ui/textarea';

import FileUploadZone from '@/components/FileUpload/FileUploadZone';
import FileItem from '@/components/FileUpload/FileItem';
import UploadedFileItem from '@/components/FileUpload/UploadedFileItem';
import usePlaylistsSheet from '@/store/playlistsSheer.store';
import { isURL, getDirtyFields } from '@/utils';
import schema from '@/schemas/playlists.schema';
import { createPlaylistMutation, updatePlaylistMutation } from '@/queries/playlists';

function PlaylistsSheet() {
  const open = usePlaylistsSheet((state) => state.open);
  const setOpen = usePlaylistsSheet((state) => state.setOpen);
  const closeSheet = usePlaylistsSheet((state) => state.closeSheet);
  const isEditMode = usePlaylistsSheet((state) => state.isEditMode);
  const playlist = usePlaylistsSheet((state) => state.playlist); // selected playlist to edit

  const defaultValues = {
    title: playlist?.title,
    visibility: String(Number(playlist?.is_public)), // convert boolean to string '1' or '0' for select input
    description: playlist?.description,
    existingCoverUrl: playlist?.cover,
  };

  const {
    register,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
    watch,
    setValue,
    reset: resetFields,
    // fill out the form with dynamic in case user wants to edit an playlist.
  } = useForm({ resolver: zodResolver(schema), values: isEditMode ? defaultValues : undefined });
  const {
    mutate,
    isPending,
    reset: resetMutation,
  } = useMutation(isEditMode ? updatePlaylistMutation() : createPlaylistMutation());

  const descriptionLength = +watch('description')?.length;
  const coverFile = watch('coverFile');
  const existingCoverUrl = watch('existingCoverUrl');
  const hasCoverFile = coverFile instanceof FileList && coverFile.length > 0;
  const hasCoverUrl = !hasCoverFile && isURL(existingCoverUrl);

  const onSheetOpenChange = async (isOpen) => {
    // reset form values and mutation states when sheet is closed
    if (!isOpen) {
      resetFields();
      resetMutation();
      closeSheet(); // close the sheet and reset sheet state
      return;
    }
    setOpen(isOpen);
  };

  const submitHandler = async (formData) => {
    const modifiedFields = getDirtyFields(formData, dirtyFields);

    // data to pass to server depending if user wants to edit or upload a playlist
    const data = isEditMode ? { modifiedFields, prevPlaylistData: playlist } : formData;
    mutate(data, { onSuccess: () => onSheetOpenChange(false) });
  };

  return (
    <Sheet open={open} onOpenChange={onSheetOpenChange}>
      <SheetTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          <Upload />
          Create Playlist
        </Button>
      </SheetTrigger>
      {/* prevent radix ui from scroling to top if user opened and closed the sheet from a playlist on playlists table (via dropdown menu) */}
      <SheetContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <form className="flex h-full flex-col" onSubmit={handleSubmit(submitHandler)}>
          <SheetHeader className="border-b">
            <SheetTitle>
              {isEditMode ? `Edit "${playlist.title}"` : 'Create New Playlist'}
            </SheetTitle>
            <SheetDescription>
              {isEditMode
                ? `You are editing "${playlist.title}" playlist.`
                : 'Upload and configure a new playlist'}
            </SheetDescription>
          </SheetHeader>
          <div className="w-full grow overflow-y-auto p-4 pb-10" style={{ scrollbarWidth: 'thin' }}>
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel>Title</FieldLabel>
                <FieldError>{errors.title?.message}</FieldError>
                <Input
                  aria-invalid={!!errors.title}
                  placeholder="Enter your playlist title"
                  {...register('title')}
                />
              </Field>
              <Field>
                <FieldLabel>Visibility</FieldLabel>
                <FieldError>{errors.visibility?.message}</FieldError>
                <NativeSelect
                  aria-invalid={!!errors.visibility}
                  className="bg-[#192134]! font-semibold"
                  {...register('visibility')}
                >
                  <NativeSelectOption selected value={1}>
                    Public
                  </NativeSelectOption>
                  <NativeSelectOption value={0}>Private</NativeSelectOption>
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
                    name={playlist?.cover_path}
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
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600"
                disabled={isPending || !isDirty}
                type="submit"
                size="sm"
              >
                {isPending ? (
                  <>
                    <Spinner />
                    {isEditMode ? 'Saving changes' : 'Creating playlist'}
                  </>
                ) : isEditMode ? (
                  'Save changes'
                ) : (
                  'Create playlist'
                )}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default PlaylistsSheet;
