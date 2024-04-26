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
}

const AsyncModal = ({
  modalOpenStatus,
  modalTitle,
  modalText,
  closeModal,
  endpoint,
  itemId,
}: Props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    try {
      deleteData(`${endpoint}/${itemId}`);
      closeModal();
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
