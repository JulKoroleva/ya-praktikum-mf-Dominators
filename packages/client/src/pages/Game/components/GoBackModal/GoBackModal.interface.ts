export interface GoBackModalContentProps {
  onConfirm: () => void;
  onCancel: () => void;
  modalContent: {
    modalTitle: string;
    modalBody: string;
    confirmButton: string;
    cancelButton: string;
  };
}
