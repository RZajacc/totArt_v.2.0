'use client';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    // If it is stored in the browser continue but if not redirect to login
    const [auth, setAuth] = useState<string | null>(null);

    useEffect(() => {
      // Get user auth token
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        setAuth(token);

        if (!token) {
          return redirect('/login');
        }
      }
    }, []);

    if (auth === null) {
      return null;
    }

    return <Component {...props} />;
  };
}
