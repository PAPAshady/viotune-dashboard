import { create } from 'zustand';

const usePlaylistsSheet = create((set) => ({
  open: false,
  isEditMode: false,
  playlist: null, // selected playlist to edit
  setOpen: (open) => set({ open }),
  setIsEditMode: (isEditMode) => set({ isEditMode }),
  setPlaylist: (playlist) => set({ playlist }),
  closeSheet: () => set({ open: false, isEditMode: false, playlist: null }),
}));

export default usePlaylistsSheet;
