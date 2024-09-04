import { useRef } from 'react';
import LabeledTextArea from '../formElements/LabeledTextArea';
import LabeledInput from '../formElements/LabeledInput';
import Image from 'next/image';

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddLocationModalNew({ showModal, setShowModal }: Props) {
  // Create a ref
  const dialogRef = useRef<HTMLDialogElement>(null);

  //   Manage modal display
  if (showModal) {
    dialogRef.current?.showModal();
  } else {
    dialogRef.current?.close();
  }

  // Handle closing the modal
  const handleClosingModal = () => {
    setShowModal(false);
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleClosingModal}
      className="w-full rounded-md border-2 border-black bg-yellow-200 p-1 backdrop:bg-black/50 backdrop:backdrop-blur-sm sm:w-3/5 md:w-5/12 xl:w-4/12"
    >
      <div>
        {/* HEADER SECTION */}
        <section>
          <h1 className="m-1 text-center font-bold">
            Share some unique content:
          </h1>
        </section>

        {/* LOCATION DESCRIPTION SECTION */}
        <section>
          <form
            className="grid gap-y-1 p-2"
            // onSubmit={submitNewLocation}
          >
            <LabeledInput
              inputType="text"
              labelFor="title"
              labelText="Start with giving it a title:"
              required
            />
            <LabeledTextArea
              labelFor="description"
              labelText="Add some description"
              rows={2}
              required
            />
            <LabeledTextArea
              labelFor="location"
              labelText="Where was it?"
              rows={2}
              required
            />

            {/* Error if image is missing */}
            {/* {missingImageError && (
              <p className="my-1 text-center text-red-400">
                Image is still missing!
              </p>
            )} */}
            <button
              //   ref={submitButtonRef}
              type="submit"
              className={`my-1 rounded-sm bg-black py-1 text-white disabled:animate-pulse disabled:border disabled:border-slate-500 disabled:bg-slate-300 disabled:text-slate-400`}
            >
              Submit
            </button>
            <button
              onClick={handleClosingModal}
              type="reset"
              className="my-2 ml-auto block rounded-md border-2 border-black bg-red-500 px-2 py-1 font-bold text-white shadow-md shadow-black"
            >
              Close
            </button>
          </form>
        </section>
      </div>

      <button onClick={handleClosingModal}>OK</button>
    </dialog>
  );
}

export default AddLocationModalNew;
