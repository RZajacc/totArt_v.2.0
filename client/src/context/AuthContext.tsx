'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { User } from '../types/types';
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  registerWithEmail: (newUser: User) => void;
  user: User | null | undefined;
  setUser: (newUser: User) => void;
  logout: () => void;
  getUser: (token: string) => void;
  isUserLoggedIn: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
}

const AuthInitContext = {
  registerWithEmail: () => console.log('No user registered yet'),
  user: null,
  setUser: () => console.log('Setting a new user'),
  logout: () => console.log('User is logged out'),
  getUser: () => console.log('Get user'),
  isUserLoggedIn: () => console.log('Checking if logged in'),
  setIsLoggedIn: () => console.log('Check if user is logged in'),
  isLoggedIn: false,
};

type AuthContexProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(AuthInitContext);

export const AuthContextProvider = ({ children }: AuthContexProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // *1_REGISTER A NEW USER
  const registerWithEmail = async (newUser: User) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append('userName', newUser.userName);
    urlencoded.append('email', newUser.email);
    urlencoded.append('password', newUser.password);
    urlencoded.append(
      'userImage',
      'https://res.cloudinary.com/dqdofxwft/image/upload/v1698072044/other/nil6d9iaml3c6hqfdhly.png',
    );
    urlencoded.append('userWebsite', '');
    urlencoded.append('userBio', '');

    const requestOptions = {
      method: 'POST',
      body: urlencoded,
    };

    try {
      const response = await fetch(
        'http://localhost:5000/api/users/register',
        requestOptions,
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // *2_GET USER WITH A TOKEN
  const getUser = async (myToken: string) => {
    if (myToken) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${myToken}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          'http://localhost:5000/api/users/profile',
          requestOptions,
        );
        if (response.ok) {
          const result = await response.json();
          const user = result.user as User;
          return user;
        }
      } catch (err) {
        const error = err as Error;
        console.log(error.message);
      }
    }
  };

  // *3_CHECK IF USER IS LOGGED IN
  const isUserLoggedIn = async () => {
    const token = getCookie('auth_token');
    if (token) {
      const user: User | undefined = await getUser(token);
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, [isLoggedIn]);

  // *LOGOUT
  const logout = () => {
    deleteCookie('auth_token');
    setUser(null);
    setIsLoggedIn(false);
    router.push('/login');
  };
  return (
    <AuthContext.Provider
      value={{
        registerWithEmail,
        user,
        setUser,
        logout,
        getUser,
        isUserLoggedIn,
        setIsLoggedIn,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
