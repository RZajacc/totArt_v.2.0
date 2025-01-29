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
import { getUserData } from '@/lib/serverMethods/userMethods/GetUserData';
// Types
import { User } from '@/types/UserTypes';
import { revalidator } from '@/lib/serverMethods/Revalidator';
import { deleteCookie } from 'cookies-next';
import { BuildFetchUrl } from '@/utils/BuildFetchUrl';

interface AuthContextType {
  user: User | undefined;
  setUser: React.Dispatch<SetStateAction<User | undefined>>;
  revalidateUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthInitContext: AuthContextType = {
  user: undefined,
  setUser: async () => undefined,
  revalidateUser: async () => undefined,
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
    // Delete auth cookie
    deleteCookie('auth-token');
    // Reset user data
    setUser(undefined);
    // To effectively protect routes cached paged data needs to be revalidated
    await revalidator('/');
  };

  const checkAuth = async () => {
    // Check if token is attached to the request object
    const res = await fetch('/api/', {
      method: 'GET',
      credentials: 'include',
    });

    // Read the data from the response
    const data: { authenticated: boolean; token?: string } = await res.json();

    // If token is attached fetch user data and user object
    if (data.token) {
      // Build Fetch url
      const FETCH_URL = BuildFetchUrl();
      // Get user data
      const userData = await getUserData(
        `${FETCH_URL}/api/users/profile`,
        data.token,
      );
      setUser(userData);
    } else {
      setUser(undefined);
    }
  };

  // Revalidate user
  const revalidateUser = async () => {
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
        revalidateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
