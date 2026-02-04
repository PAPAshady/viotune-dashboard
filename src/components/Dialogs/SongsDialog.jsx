import { FieldGroup, Field, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';
import { NativeSelect, NativeSelectOption } from '@components/ui/native-select';
import Dialog from '@/components/Dialogs/Dialog';


function SongsDialog() {
  return (
    <Dialog
      triggerTitle="Upload Song"
      dialogTitle="Add New Song"
      dialogDescription="Upload and configure a new song"
    >
      <FieldGroup className="gap-4 sm:gap-6">
        <Field>
          <FieldLabel>Song Title</FieldLabel>
          <Input placeholder="Enter Song Name" />
        </Field>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-3">
          <Field>
            <FieldLabel>Audio File</FieldLabel>
            <Input type="file" accept=".mp3, .wav, .aac, .m4a" />
          </Field>
          <Field>
            <FieldLabel>Cover Image (optional)</FieldLabel>
            <Input type="file" accept=".jpg, .jpeg, .png" />
          </Field>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-3">
          <Field>
            <FieldLabel>Genre</FieldLabel>
            <NativeSelect className="bg-[#192134]! font-semibold">
              <NativeSelectOption value="">Select Genre</NativeSelectOption>
              <NativeSelectOption value="pop">Pop</NativeSelectOption>
              <NativeSelectOption value="rock">Rock</NativeSelectOption>
              <NativeSelectOption value="jazz">Jazz</NativeSelectOption>
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel>Artist (optional)</FieldLabel>
            <NativeSelect className="bg-[#192134]! font-semibold">
              <NativeSelectOption value="">Select Artist</NativeSelectOption>
              <NativeSelectOption value="NF">NF</NativeSelectOption>
              <NativeSelectOption value="Eminem">Eminem</NativeSelectOption>
              <NativeSelectOption value="Rihanna">Rihanna</NativeSelectOption>
            </NativeSelect>
          </Field>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-3">
          <Field>
            <FieldLabel>Album (optional)</FieldLabel>
            <NativeSelect className="bg-[#192134]! font-semibold">
              <NativeSelectOption value="">Select Album</NativeSelectOption>
              <NativeSelectOption value="Album One">Album One</NativeSelectOption>
              <NativeSelectOption value="Album Two">Album Two</NativeSelectOption>
              <NativeSelectOption value="Album Three">Album Three</NativeSelectOption>
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel>Release Date</FieldLabel>
            <Input type="date" />
          </Field>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-3">
          <Field>
            <FieldLabel>Track Number (optional)</FieldLabel>
            <Input type="number" placeholder="Enter Track Number" />
          </Field>
          <Field>
            <FieldLabel>Lyrics File (optional)</FieldLabel>
            <Input type="file" />
          </Field>
        </div>
      </FieldGroup>
    </Dialog>
  );
}

export default SongsDialog;
