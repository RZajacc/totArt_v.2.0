'use client';
import { ReactNode, createContext } from 'react';
import { User } from '../types/types';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { getUserData } from '../fetchers/GetUserData';

interface AuthContextType {
  user: User | undefined;
  mutate: (user?: User) => void;
  logout: () => void;
}

const AuthInitContext = {
  user: undefined,
  mutate: () => console.log('Mutate user'),
  logout: () => console.log('Log user out'),
};

type AuthContexProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(AuthInitContext);

export const AuthContextProvider = ({ children }: AuthContexProviderProps) => {
  // Handle redirection after logging out
  const router = useRouter();

  // LOGOUT
  const logout = () => {
    deleteCookie('auth_token');
    mutate();
    router.push('/login');
  };

  const { data: user, mutate } = useSWR(
    'http://localhost:5000/api/users/profile',
    getUserData,
  );

  // ? Temp for inspection
  console.log('USER', user);

  return (
    <AuthContext.Provider
      value={{
        user,
        mutate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
