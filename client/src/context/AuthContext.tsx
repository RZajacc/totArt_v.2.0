'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { User } from '../types/types';
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null | undefined;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
}

const AuthInitContext = {
  user: null,
  isLoggedIn: false,
  setIsLoggedIn: () => console.log('Change user status'),
  logout: () => console.log('Log user out'),
};

type AuthContexProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(AuthInitContext);

export const AuthContextProvider = ({ children }: AuthContexProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // LOGOUT
  const logout = () => {
    deleteCookie('auth_token');
    setUser(null);
    setIsLoggedIn(false);
    router.push('/login');
  };

  useEffect(() => {
    // Get token from cookie
    const token = getCookie('auth_token');

    // If token exists get user data
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      fetch('http://localhost:5000/api/users/profile', {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      })
        .then((response) => response.json())
        .then((result) => {
          const user: User | undefined = result.user;
          if (user) {
            setUser(user);
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setIsLoggedIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
