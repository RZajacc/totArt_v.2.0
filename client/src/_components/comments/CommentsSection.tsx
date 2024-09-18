'use client';
import { locationData } from '@/types/locationTypes';
import React from 'react';
import CommentElement from './CommentElement';

type Props = {
  children: React.ReactNode;
  locationData: locationData;
};

function CommentsSection({ children, locationData }: Props) {
  return (
    <>
      {children}
      <section className="grid gap-y-2">
        {locationData?.comments &&
          locationData.comments.map((comment) => {
            return (
              <CommentElement
                key={comment._id}
                comment={comment}
                setShowDeleteCommentModal={() => {}}
                setShowEditCommentModal={() => {}}
                setSelectedCommentId={() => {}}
                setSelectedCommentContent={() => {}}
              />
            );
          })}
      </section>
    </>
  );
}

export default CommentsSection;
