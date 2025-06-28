import { create } from 'zustand';

import { DialogStore } from './types';

const useDialogStore = create<DialogStore<unknown>>((set) => ({
  isOpen: false,
  dialogType: null,
  currentItem: null,
  openDialog: (type, item) => {
    if (type === 'edit' || type === 'info') {
      set({
        isOpen: true,
        dialogType: type,
        currentItem: item,
      });
    } else {
      set({
        isOpen: true,
        dialogType: type,
      });
    }
  },
  closeDialog: () => {
    set((state) => ({ ...state, isOpen: false }));
  },
}));

export default useDialogStore;
