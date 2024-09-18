import { SetStateAction, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ButtonRed from './buttons/ButtonRed';
import { Rounded, Shadow } from 'enums/StyleEnums';
import ButtonGreen from './buttons/ButtonGreen';

type Props = {
  modalDisplay: boolean;
  setModalDisplay: React.Dispatch<SetStateAction<boolean>>;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

function Modal({
  modalDisplay,
  setModalDisplay,
  submitHandler,
  children,
}: Props) {
  // Create a ref to manage modal display
  const dialogRef = useRef<HTMLDialogElement>(null);
  // After rendering the element, connect the ref with element
  useEffect(() => {
    // Connecting with dialog object
    const modal = dialogRef.current;
    // Display or hide modal depending on state
    if (modalDisplay) {
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
      className=" animate-pop w-full rounded-md border-2 border-black bg-yellow-200 p-1 backdrop:bg-black/50 backdrop:backdrop-blur-sm sm:w-3/5 md:w-5/12 xl:w-4/12"
    >
      <form className="grid p-2" onSubmit={submitHandler}>
        {children}
        <div className="mt-2 flex justify-end space-x-1">
          <ButtonRed
            onClick={handleClosingModal}
            rounded={Rounded.small}
            shadowSize={Shadow.small}
          >
            close
          </ButtonRed>
          <ButtonGreen
            type="submit"
            rounded={Rounded.small}
            shadowSize={Shadow.small}
          >
            Submit
          </ButtonGreen>
        </div>
      </form>
    </dialog>,
    document.getElementById('modal')!,
  );
}

export default Modal;
