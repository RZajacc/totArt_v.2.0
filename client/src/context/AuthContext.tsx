'use client';
// Libraries
import {
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
// Fetching data
import { getUserData } from '@/lib/serverMethods/GetUserData';
// Types
import { User } from '@/types/UserTypes';
import { revalidator } from '@/lib/serverMethods/Revalidator';

interface AuthContextType {
  user: User | undefined;
  setUser: React.Dispatch<SetStateAction<User | undefined>>;
  refetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthInitContext: AuthContextType = {
  user: undefined,
  setUser: async () => undefined,
  refetchUser: async () => undefined,
  logout: async () => undefined,
};

type AuthContexProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(AuthInitContext);

export const AuthContextProvider = ({ children }: AuthContexProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  // LOGOUT
  const logout = async () => {
    // await mutateUser();
    const response = await fetch('http://localhost:5000/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      // Reset user
      setUser(undefined);
      // To effectively protect routes cached paged data needs to be revalidated
      await revalidator('/login');
    }
  };

  const checkAuth = async () => {
    const res = await fetch('/api/', {
      method: 'GET',
      credentials: 'include',
    });

    const data: { authenticated: boolean; token?: string } = await res.json();
    console.log(data);
    if (data.token) {
      const userData = await getUserData(
        `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/users/profile`,
        data.token,
      );
      setUser(userData);
    } else {
      setUser(undefined);
    }
  };

  const refetchUser = async () => {
    checkAuth();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        refetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
