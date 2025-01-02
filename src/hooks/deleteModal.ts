import { create } from 'zustand';

interface DeleteModalStore {
  isOpen: boolean;
  resourceId: string | null;
  endpoint: string | null;
  onOpen: (id: string, endpoint: string) => void;
  onClose: () => void;
}

const useDeleteModal = create<DeleteModalStore>((set) => ({
  isOpen: false,
  resourceId: null,
  endpoint: null,
  onOpen: (id, endpoint) => set({ isOpen: true, resourceId: id, endpoint }),
  onClose: () => set({ isOpen: false, resourceId: null, endpoint: null }),
}));

export default useDeleteModal;