import React from "react";
import { Modal } from "antd";
import { deleteData, putData } from "@/app/api/api";

interface Props {
  modalOpenStatus: boolean;
  modalTitle: string;
  modalText: string;
  closeModal: () => void;
  endpoint: string;
  itemId: string;
  postAction?: () => void;
}

const AsyncModal = ({
  modalOpenStatus,
  modalTitle,
  modalText,
  closeModal,
  endpoint,
  itemId,
  postAction,
}: Props) => {
  const handleOk = () => {
    if (modalTitle === "Delete Confirmation") {
      try {
        deleteData(`${endpoint}/${itemId}`).then(() => {
          postAction?.();
          closeModal();
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (modalTitle === "Checkin Confirmation") {
      try {
        putData(`${endpoint}/${itemId}/checkin`).then(() => {
          postAction?.();
          closeModal();
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (modalTitle === "Checkout Confirmation") {
      try {
        putData(`${endpoint}/${itemId}/checkout`).then(() => {
          postAction?.();
          closeModal();
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (modalTitle === "Uncheckin Confirmation") {
      try {
        putData(`${endpoint}/${itemId}/uncheckin`).then(() => {
          postAction?.();
          closeModal();
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (modalTitle === "Cancel Confirmation") {
      try {
        putData(`${endpoint}/${itemId}/cancel`).then(() => {
          postAction?.();
          closeModal();
        });
      } catch (error) {
        console.error(error);
      }
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
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default AsyncModal;
