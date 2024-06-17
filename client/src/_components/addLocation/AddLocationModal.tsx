import { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { post } from '../../types/types';

const AddContentModal = () => {
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | string>('');
  const { user } = useContext(AuthContext);
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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // * --------- UPLOAD IMAGE -------------------------------
  const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('userImage', selectedFile);
    formdata.append('folder', 'postImages');

    const requestOptions = {
      method: 'POST',
      body: formdata,
    };

    try {
      const response = await fetch(
        'http://localhost:5000/api/users/imageUpload',
        requestOptions,
      );
      const result = await response.json();
      setNewContent({ ...newContent, imageUrl: result.userImage });
      setIsImageUploaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  // *------------- SUBMIT A NEW POST -----------------
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
      <div>
        <section>
          <h1>Share some unique content:</h1>
        </section>
        <section>
          <form onSubmit={handleFileSubmit}>
            <input type="file" required />
            <button type="submit">Upload image</button>
            {/* Valid and invalid feedback */}
            <p></p>
            <p></p>
          </form>
        </section>
        <section>
          <form onClick={submitNewPost}>
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
          <button onClick={handleClose}>Close</button>
        </section>
      </div>
    </>
  );
};

export default AddContentModal;
