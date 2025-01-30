'use server';
// Types
import type { User } from '@/types/UserTypes';
import type { FetchError } from '@/types/GeneralTypes';
import { BuildFetchUrl } from '@/utils/BuildFetchUrl';

export const getUserData = async (token: string) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  // Build Fetch url
  const FETCH_URL = BuildFetchUrl();

  const response = await fetch(`${FETCH_URL}/api/users/profile`, {
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
};
