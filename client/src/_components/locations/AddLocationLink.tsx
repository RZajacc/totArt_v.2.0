'use client';
import React, { useContext } from 'react';
import LinkGreen from '../ui/links/LinkGreen';
import { AuthContext } from '@/context/AuthContext';

type Props = {};

function AddLocationLink({}: Props) {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && <LinkGreen href="locations/addNew">Add new location</LinkGreen>}
    </>
  );
}

export default AddLocationLink;
