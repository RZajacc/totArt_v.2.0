'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    // Get user auth token
    const auth = localStorage.getItem('auth_token');

    // If it is stored in the browser continue but if not redirect to login
    useEffect(() => {
      if (!auth) {
        return redirect('/login');
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
