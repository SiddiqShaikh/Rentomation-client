// components/modals/DeleteModal.tsx
import { useState } from "react";
import useDeleteModal from "../../hooks/deleteModal";
import Button from "../Button";
import Modal from "./Modal";
import apiCall from "../../utils/api";
import { toast } from "react-toastify";

const DeleteModal = () => {
  const deleteModal = useDeleteModal();
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = async () => {
    if (!deleteModal.resourceId || !deleteModal.endpoint) return;

    setLoading(true);
    const token = localStorage.getItem("auth-token");
    const endpoint = `${deleteModal.endpoint}/${deleteModal.resourceId}`;
    console.log(endpoint);
    try {
      const response = await apiCall(
        `${deleteModal.endpoint}/${deleteModal.resourceId}`,
        "DELETE",
        {},
        {},
        {
          "x-auth-token": `Bearer ${token}`,
        }
      );
      toast.success(response?.message || "Resource deleted successfully!");
      deleteModal.onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete resource."
      );
    } finally {
      setLoading(false);
    }
  };

  const bodyContent = (
    <div className="text-center">
      <p>Are you sure you want to delete?</p>
    </div>
  );

  const footerContent = (
    <div className="mt-4 flex justify-center gap-4">
      <Button
        variant="Secondary"
        label="Cancel"
        onClick={() => deleteModal.onClose()}
        loading={loading}
      />
      <Button
        variant="Primary"
        label="Delete"
        onClick={onDelete}
        loading={loading}
      />
    </div>
  );

  return (
    <Modal
      bodyContent={bodyContent}
      footerContent={footerContent}
      title="Delete"
      subtitle="This action cannot be undone."
      onCloseModal={deleteModal.onClose}
      openModal={deleteModal.isOpen}
    />
  );
};

export default DeleteModal;
