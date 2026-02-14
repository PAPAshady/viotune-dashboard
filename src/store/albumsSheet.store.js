import { create } from 'zustand';

const useAlbumSheet = create((set) => ({
  open: false,
  isEditMode: false,
  song: null, // selected album to edit
  setOpen: (open) => set({ open }),
  setIsEditMode: (isEditMode) => set({ isEditMode }),
  setAlbum: (song) => set({ song }),
  closeSheet: () => set({ open: false, isEditMode: false, song: null }),
}));

export default useAlbumSheet;
