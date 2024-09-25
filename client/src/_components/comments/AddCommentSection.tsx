'use client';
import { AuthContext } from '@/context/AuthContext';
import { addNewComment } from '@/fetchers/AddNewComment';
import { getComments } from '@/lib/clientMethods/GetComments';
import React, { useContext } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

type Props = {
  locationId: string;
};

function AddCommentSection({ locationId }: Props) {
  const { user, revalidateUser } = useContext(AuthContext);

  // Prepare mutation to add comment
  const { trigger: triggerAddComment } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/comments/addComment`,
    addNewComment,
  );

  const { mutate: mutateComments } = useSWR(locationId, getComments);

  // Handle adding a new comment
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   Get the form instance and data
    const form = e.currentTarget;
    const formData = new FormData(form);
    const commentData = formData.get('comment') as string;
    // Prepare current data
    const createdAt = new Date().toISOString();

    try {
      await triggerAddComment({
        comment: commentData,
        createdAt: createdAt,
        author: user!._id,
        relatedPost: locationId,
      });
      // Mutate user and comments
      // mutateUser();
      await revalidateUser();
      mutateComments();
      // Reset form field
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mt-5">
      <form onSubmit={handleCommentSubmit}>
        <section className="relative h-36 rounded-md border-2 border-gray-400 bg-white focus-within:border-2 focus-within:border-blue-500">
          <textarea
            name="comment"
            id="comment"
            placeholder="Leave a comment"
            rows={3}
            className="w-full rounded-md p-2 focus-visible:outline-none"
          />
          <button
            className="absolute bottom-2 right-2 rounded-md bg-purple-800 px-2 py-1 text-white"
            type="submit"
          >
            Submit
          </button>
        </section>
      </form>
    </section>
  );
}

export default AddCommentSection;
