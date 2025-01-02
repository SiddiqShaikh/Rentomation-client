import { FieldValues } from 'react-hook-form';
import { create } from 'zustand'

interface RentModalStore {
    isOpen: boolean;
    isEditMode: boolean;
    propertyData: FieldValues | null;
    onOpen: () => void;
    onOpenEdit: (data: FieldValues) => void;
    onClose: () => void;
    clearData: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
    isOpen: false,
    isEditMode: false,
    propertyData: null,
    onOpen: () => set({ isOpen: true, isEditMode: false }),
    onOpenEdit: (data) => set({ isOpen: true, isEditMode: true, propertyData: data }),
    onClose: () => set({ isOpen: false }),
    clearData: () => set({ propertyData: null, isEditMode: false }),
}));

export default useRentModal;
