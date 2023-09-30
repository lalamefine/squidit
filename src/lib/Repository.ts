import { DB } from "$lib/server/Database";
var db = DB.getInstance()

export async function getAll(table : string) : Promise<any[]> {
  try {
    return await db.query("SELECT * FROM "+table);
  } catch (error) {
    throw new Error("HostRepository: Error accessing DB");
  }
}

