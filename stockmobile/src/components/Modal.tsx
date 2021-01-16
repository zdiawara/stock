import React from "react";
import { IonModal } from "@ionic/react";

interface ModalProps {
  show: boolean;
  id?: string;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ id, show, closeModal, children }) => {
  return (
    <IonModal
      id={id}
      backdropDismiss
      showBackdrop
      onDidDismiss={closeModal}
      swipeToClose
      isOpen={show}
    >
      {children}
    </IonModal>
  );
};

export default Modal;
