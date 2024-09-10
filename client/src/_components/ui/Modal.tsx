import { SetStateAction, useEffect, useRef } from 'react';

type Props = {
  displayAddNewLocation: boolean;
  setDisplayAddNewLocation: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

function Modal({
  displayAddNewLocation,
  setDisplayAddNewLocation,
  children,
}: Props) {
  // Create a ref
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Connecting with dialog object
    const modal = dialogRef.current;

    if (displayAddNewLocation) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, []);

  // Handle closing the modal
  const handleClosingModal = () => {
    setDisplayAddNewLocation(false);
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleClosingModal}
      className="w-full rounded-md border-2 border-black bg-yellow-200 p-1 backdrop:bg-black/50 backdrop:backdrop-blur-sm sm:w-3/5 md:w-5/12 xl:w-4/12"
    >
      <div>
        {children}
        <button onClick={handleClosingModal}>close</button>
      </div>
    </dialog>
  );
}

export default Modal;
