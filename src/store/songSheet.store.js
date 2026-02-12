import { create } from 'zustand';

const useSongSheet = create((set) => ({
  open: false,
  isEditMode: false,
  song: null, // selected song to edit
  setOpen: (open) => set({ open }),
  setIsEditMode: (isEditMode) => set({ isEditMode }),
  setSong: (song) => set({ song }),
  closeSheet: () => set({ open: false, isEditMode: false, song: null }),
}));

export default useSongSheet;
