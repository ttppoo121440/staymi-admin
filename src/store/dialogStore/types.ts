type DialogType = string | null;
type OpenDialog<T> = (type: 'info' | 'add' | 'edit', item?: T) => void;
type CloseDialog = () => void;

export interface DialogStore<T> {
  isOpen: boolean;
  dialogType: DialogType;
  currentItem: T | null;
  openDialog: OpenDialog<T>;
  closeDialog: CloseDialog;
}
