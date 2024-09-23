'use client';
// Libraries
import { ReactNode, createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Fetching data
import { getUserData } from '@/lib/serverMethods/GetUserData';
// Types
import { User } from '@/types/UserTypes';

interface AuthContextType {
  user: User | undefined;
  refetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthInitContext: AuthContextType = {
  user: undefined,
  refetchUser: async () => undefined,
  logout: async () => undefined,
};

type AuthContexProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(AuthInitContext);

export const AuthContextProvider = ({ children }: AuthContexProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  // Handle redirection after logging out
  const router = useRouter();

  // LOGOUT
  const logout = async () => {
    // await mutateUser();
    fetch('http://localhost:5000/api/users/logout', {
      method: 'POST',
      redirect: 'follow',
      credentials: 'include',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    setUser(undefined);
    // Redirect the user
    router.push('/login');
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
        refetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
