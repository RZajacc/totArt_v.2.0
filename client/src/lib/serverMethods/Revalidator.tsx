'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * This revalidates protected routes, and optionally redirects user to another page.
 *
 * @param {string} path An optional path to redirect to.
 */
export const revalidator = async (path?: string) => {
  // Revalidate all protected routes
  revalidatePath('/locations', 'layout');
  revalidatePath('/account', 'page');
  revalidatePath('/farewell', 'page');
  // If path is provided then redirect user
  if (path) {
    redirect(`${path}`);
  }
};
