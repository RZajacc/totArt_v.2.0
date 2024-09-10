// Types
import type { User } from '@/types/UserTypes';
import type { FetchError } from '@/types/GeneralTypes';

export const getUserData = async (url: string) => {
  // Get token from local storage
  const token = localStorage.getItem('auth_token');

  // If token exists get user data
  if (token) {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    });

    if (response.ok) {
      const user: User = await response.json();
      return user;
    } else {
      const result: { msg: string } = await response.json();
      const error: FetchError = new Error('Something went wrong');
      error.info = result.msg;
      error.status = response.status;
      throw error;
    }
  }
};
