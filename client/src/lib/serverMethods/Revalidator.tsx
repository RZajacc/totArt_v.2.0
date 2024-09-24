'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * This revalidates protected routes, and optionally redirects user to another page.
 *
 * @param {string} path An optional path to redirect to.
 */
export const revalidator = async (path?: string) => {
  revalidatePath('/locations', 'layout');
  revalidatePath('/account', 'layout');
  if (path) {
    redirect(`${path}`);
  }
};
