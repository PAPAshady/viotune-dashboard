import { create } from 'zustand';

const useGenreSheet = create((set) => ({
  open: false,
  isEditMode: false,
  genre: null, // selected genre to edit
  setOpen: (open) => set({ open }),
  setIsEditMode: (isEditMode) => set({ isEditMode }),
  setGenre: (genre) => set({ genre }),
  closeSheet: () => set({ open: false, isEditMode: false, genre: null }),
}));

export default useGenreSheet;
