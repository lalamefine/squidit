
import { DB } from '$lib/server/Database'
import type { RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async (event) => {
  var db = DB.getInstance();
  var req = await event.request.json();
  try {
    var results = await db.query(req.sql,[]);
    return new Response(JSON.stringify(results))
  } catch (error) {
    return new Response(JSON.stringify(error), {status: 400})
  }
}