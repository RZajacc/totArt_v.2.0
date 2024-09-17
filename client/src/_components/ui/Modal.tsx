import { SetStateAction, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  modalDisplay: boolean;
  setModalDisplay: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

function Modal({ modalDisplay, setModalDisplay, children }: Props) {
  // Create a ref
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    // Connecting with dialog object
    const modal = dialogRef.current;
    if (modalDisplay) {
      console.log('INSIDE', modalDisplay);
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, [modalDisplay]);

  // Handle closing the modal
  const handleClosingModal = () => {
    setModalDisplay(false);
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      onCancel={handleClosingModal}
      className=" w-full rounded-md border-2 border-black bg-yellow-200 p-1 backdrop:bg-black/50 backdrop:backdrop-blur-sm sm:w-3/5 md:w-5/12 xl:w-4/12"
    >
      <div>
        {children}
        <button onClick={handleClosingModal}>close</button>
      </div>
    </dialog>,
    document.getElementById('modal')!,
  );
}

export default Modal;
