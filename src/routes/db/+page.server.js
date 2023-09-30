
  import { DB } from '$lib/server/Database';
  
  /** @type {import('./$types').PageLoad} */
  export const load = (({ params }) => {
    return {
      tables : DB.getInstance().query(
      "SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite%' ORDER BY name")
    }
  });