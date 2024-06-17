import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { post } from '../../types/types';
import useSWRMutation from 'swr/mutation';
import { uploadImage } from '../../fetchers/UploadImage';

type Props = {
  showAddLocation: boolean;
  setShowAddLocation: (show: boolean) => void;
};

const AddLocationModal = ({ showAddLocation, setShowAddLocation }: Props) => {
  const { user } = useContext(AuthContext);
  const { trigger } = useSWRMutation(
    'http://localhost:5000/api/images/imageUpload',
    uploadImage,
  );

  // !TEMP
  const [isImageUploaded, setIsImageUploaded] = useState<null | boolean>(null);

  const [newContent, setNewContent] = useState<post>({
    _id: ' ',
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    author: { _id: '', userImage: '', userName: '' },
    comments: [
      {
        _id: '',
        author: { _id: '', userImage: '', userName: '' },
        comment: '',
        relatedPost: '',
        createdAt: '',
      },
    ],
  });

  //  --------- UPLOAD IMAGE -------------------------------
  const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const image = formdata.get('locationImage') as File;
    console.log('HI');
    const result = await trigger({ image: image, folder: 'postImages' });
    console.log('WAITING FOR THE RESULT');
    console.log('RESULT', result);
  };

  // ------------- SUBMIT A NEW POST -----------------
  const submitNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    if (newContent.imageUrl) {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();
      urlencoded.append('title', newContent.title);
      urlencoded.append('description', newContent.description);
      urlencoded.append('location', newContent.location);
      urlencoded.append('imageUrl', newContent.imageUrl);
      urlencoded.append('author', user!._id);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
      };

      try {
        const response = await fetch(
          'http://localhost:5000/api/posts/addNewPost',
          requestOptions,
        );
        const result = await response.json();
        // updateUserData(user!.email, 'posts', result.postId);
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsImageUploaded(false);
      e.preventDefault();
    }
  };

  return (
    <>
      <div
        className={`${!showAddLocation ? 'hidden' : ''} fixed left-0 top-0 z-30 h-screen w-screen bg-slate-600/70`}
        onClick={() => {
          setShowAddLocation(false);
        }}
      >
        <div
          className={`relative top-[15%] mx-auto grid w-11/12 gap-y-2 rounded-sm border-2 border-black bg-yellow-200 p-2`}
          onClick={(e) => {
            e.stopPropagation;
          }}
        >
          <section>
            <h1>Share some unique content:</h1>
          </section>
          <section>
            <form
              onSubmit={handleFileSubmit}
              className="grid gap-y-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <input type="file" name="locationImage" required />
              <button type="submit" className="rounded-sm bg-black text-white">
                Upload image
              </button>
              {/* Valid and invalid feedback */}
              <p></p>
              <p></p>
            </form>
          </section>
          <section>
            <form onClick={submitNewPost} className="grid">
              <label htmlFor="title">Start with giving it a title</label>
              <input
                type="text"
                placeholder="example title"
                name="title"
                required
              />
              <label htmlFor="description">Add some description</label>
              <textarea rows={3} name="description" required />
              <label htmlFor="location">Where was it?</label>
              <textarea rows={3} name="location" required />
              <button type="submit">Submit</button>
            </form>
          </section>

          <section>
            <button
              onClick={() => {
                setShowAddLocation(false);
              }}
            >
              Close
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default AddLocationModal;
