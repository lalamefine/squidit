import { DB } from '$lib/server/Database'
import type { RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async (event) => {
  return new Response(JSON.stringify({msg : "TODO"}), {status: 501})
}