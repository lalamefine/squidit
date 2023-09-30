import sqlite3 from "sqlite3"

export class DB {
    private static instance: DB;
    private db : sqlite3.Database;

    private constructor() {
        this.db = new sqlite3.Database('data/app.db', (err: any) => {
        if (err)
            throw err;
        });
    }

    public static getInstance(): DB {
        if (!DB.instance) {
        DB.instance = new DB();
        }
        return DB.instance;
    }

    public query(query: string, params: any[] = []) : Promise<any[]> {
        console.log(query);
        return new Promise<any[]>((resolve, reject) => {
            this.db.all(query, params, (err: Error|null, rows: any[]) => {
                // console.log(rows,err);
                if(err) 
                    reject({err: err.message});
                else 
                    resolve(rows);
            });
        });
    }

    public exec(query: string) {
        this.db.exec(query);
    }

    public find(query: string, params: any[] = []) {
        return this.db.prepare(query, params).get();
    }

}