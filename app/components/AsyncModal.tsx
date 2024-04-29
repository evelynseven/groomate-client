import React, { useState } from "react";
import { Modal } from "antd";
import { deleteData } from "@/app/api/api";

interface Props {
  modalOpenStatus: boolean;
  modalTitle: string;
  modalText: string;
  closeModal: () => void;
  endpoint: string;
  itemId: string;
  setDeleted?: () => void;
}

const AsyncModal = ({
  modalOpenStatus,
  modalTitle,
  modalText,
  closeModal,
  endpoint,
  itemId,
  setDeleted,
}: Props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    try {
      deleteData(`${endpoint}/${itemId}`).then(() => {
        setDeleted ? setDeleted() : "";
        closeModal();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      <Modal
        title={modalTitle}
        open={modalOpenStatus}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default AsyncModal;
