'use client';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const [auth, setAuth] = useState<string | null>(null);

    // To prevent SSR page loading when user type adress manually token is acquired in useEffect
    useEffect(() => {
      // Get user auth token
      const token = localStorage.getItem('auth_token');
      // Assign it to useState
      setAuth(token);
      // If user is not authenticated redirect to login
      if (!token) {
        return redirect('/login');
      }
    }, []);

    if (auth === null) {
      return null;
    }

    return <Component {...props} />;
  };
}
