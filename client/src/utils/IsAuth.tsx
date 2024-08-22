'use client';
import { useContext, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    // Get user auth token
    const { user } = useContext(AuthContext);

    // If it is stored in the browser continue but if not redirect to login
    useEffect(() => {
      if (!user) {
        return redirect('/login');
      }
    }, []);

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
}
