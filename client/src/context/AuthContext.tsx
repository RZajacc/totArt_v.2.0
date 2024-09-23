'use client';
// Libraries
import { ReactNode, createContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR, { KeyedMutator } from 'swr';
// Fetching data
import { getUserData } from '@/fetchers/GetUserData';
// Types
import { User } from '@/types/UserTypes';

interface AuthContextType {
  user: User | undefined;
  mutateUser: KeyedMutator<User | undefined>;
  logout: () => void;
}

const AuthInitContext: AuthContextType = {
  user: undefined,
  mutateUser: async () => undefined,
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
  const logout = async () => {
    // Remove token from local storage
    localStorage.removeItem('auth_token');
    await mutateUser();
    router.push('/login');
  };

  const { data: user, mutate: mutateUser } = useSWR(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/users/profile`,
    getUserData,
  );

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/', {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        const data: { authenticated: boolean; token: string } =
          await res.json();
        console.log(data);
      } else {
        const data: { authenticated: boolean } = await res.json();
        console.log(data);
      }
    };
    checkAuth();
  }, []);

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
