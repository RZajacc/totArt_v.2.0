'use client';

import React from 'react';
import CommentElement from './CommentElement';
import useSWR from 'swr';
import { getComments } from '@/lib/clientMethods/GetComments';

type Props = {
  locationId: string;
};

function CommentsSection({ locationId }: Props) {
  const { data: commentData, mutate: mutateComments } = useSWR(
    locationId,
    getComments,
  );

  return (
    <>
      {commentData && commentData?.count > 0 ? (
        <h4 className="py-2 text-center text-xl font-bold">
          ({commentData.count}) comments:
        </h4>
      ) : (
        <h4 className="py-2 text-center text-xl font-bold">
          No comments yet, be the first one!
        </h4>
      )}
      <section className="grid gap-y-2">
        {commentData &&
          commentData.comments.map((comment) => {
            return (
              <CommentElement
                key={comment._id}
                comment={comment}
                mutateComments={mutateComments}
              />
            );
          })}
      </section>
    </>
  );
}

export default CommentsSection;
