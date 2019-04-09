import Dexie from "dexie";
import { Injectable } from "@angular/core";
export interface Host {
  id: number;
  veid: string;
  apiKey: string;
  createTime: Date;
}
// Subclass it
export class MyDatabase extends Dexie {
  host: Dexie.Table<Host, number>;

  constructor(databaseName) {
    super(databaseName);
    this.version(1).stores({
      host: "++id,veid,apiKey,createTime"
    });
  }
}
@Injectable()
export class DbService {
  db = new MyDatabase("local");
}
