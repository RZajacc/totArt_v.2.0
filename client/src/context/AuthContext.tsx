'use client';
// Libraries
import {
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
// Fetching data
import { getUserData } from '@/lib/serverMethods/GetUserData';
// Types
import { User } from '@/types/UserTypes';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
  user: User | undefined;
  refetchUser: () => Promise<void>;
  // mutateUser: KeyedMutator<User | undefined>;
  logout: () => void;
}

const AuthInitContext: AuthContextType = {
  isAuthenticated: false,
  setIsAuthenticated: async () => undefined,
  refetchUser: async () => undefined,
  user: undefined,
  logout: () => undefined,
};

type AuthContexProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(AuthInitContext);

export const AuthContextProvider = ({ children }: AuthContexProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  // Handle redirection after logging out
  const router = useRouter();

  // LOGOUT
  const logout = async () => {
    // await mutateUser();
    router.push('/login');
  };

  console.log('USER', user);

  const checkAuth = async () => {
    const res = await fetch('/api/', {
      method: 'GET',
      credentials: 'include',
    });
    if (res.ok) {
      const data: { authenticated: boolean; token: string } = await res.json();
      const userData = await getUserData(
        `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/users/profile`,
        data.token,
      );
      setUser(userData);

      console.log(data);
    } else {
      const data: { authenticated: boolean } = await res.json();
      setUser(undefined);
      console.log(data);
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
        isAuthenticated,
        setIsAuthenticated,
        user,
        refetchUser,
        // mutateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
