import { useCallback, useState } from "react";
const useModal = (isOpen: boolean = false) => {
  const [show, setShow] = useState(isOpen);

  const openModal = useCallback(() => {
    setShow(true);
  }, []);

  const closeModal = useCallback(() => {
    setShow(false);
  }, []);

  return {
    show,
    openModal,
    closeModal,
  };
};

export default useModal;
