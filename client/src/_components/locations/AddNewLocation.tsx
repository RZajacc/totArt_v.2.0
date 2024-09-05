import Modal from '../ui/Modal';

type Props = {
  displayAddNewLocation: boolean;
  setDisplayAddNewLocation: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddNewLocation({
  displayAddNewLocation,
  setDisplayAddNewLocation,
}: Props) {
  return (
    <Modal
      displayAddNewLocation={displayAddNewLocation}
      setDisplayAddNewLocation={setDisplayAddNewLocation}
    />
  );
}

export default AddNewLocation;
