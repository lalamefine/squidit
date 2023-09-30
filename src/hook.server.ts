import type { Handle } from '@sveltejs/kit';
 
export const handle = (async ({ event, resolve }) => {

  // event.locals.user = await getUserInformation(event.cookies.get('sessionid'));

  const response = await resolve(event);
  return response;

}) satisfies Handle;