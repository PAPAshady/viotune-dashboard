import { create } from 'zustand';

const useAlbumSheet = create((set) => ({
  open: false,
  isEditMode: false,
  album: null, // selected album to edit
  setOpen: (open) => set({ open }),
  setIsEditMode: (isEditMode) => set({ isEditMode }),
  setAlbum: (album) => set({ album }),
  closeSheet: () => set({ open: false, isEditMode: false, song: null }),
}));

export default useAlbumSheet;
