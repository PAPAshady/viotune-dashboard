import { create } from 'zustand';

const useArtistSheet = create((set) => ({
  open: false,
  isEditMode: false,
  artist: null, // selected artist to edit
  setOpen: (open) => set({ open }),
  setIsEditMode: (isEditMode) => set({ isEditMode }),
  setArtist: (artist) => set({ artist }),
  closeSheet: () => set({ open: false, isEditMode: false, artist: null }),
}));

export default useArtistSheet;
