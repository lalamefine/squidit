
import { getAll } from '$lib/Repository'

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
  return { hosts : getAll('hosts') };
};