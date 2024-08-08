'use client';
import { ReactNode, createContext } from 'react';
import { User } from '../types/UserTypes';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { getUserData } from '../fetchers/GetUserData';
import { deleteCookie } from 'cookies-next';

interface AuthContextType {
  user: User | undefined;
  mutateUser: (user?: User) => void;
  logout: () => void;
}

const AuthInitContext: AuthContextType = {
  user: undefined,
  mutateUser: () => console.log('Mutate user'),
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
    mutateUser();
    router.push('/login');
  };

  const { data: user, mutate: mutateUser } = useSWR(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/users/profile`,
    getUserData,
  );

  // ? Temp for inspection
  console.log('USER', user);

  return (
    <AuthContext.Provider
      value={{
        user,
        mutateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
