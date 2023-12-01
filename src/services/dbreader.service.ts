import { Injectable } from '@angular/core';

import { DBReader, DBReaderFactory } from 'src/classes/dbreader';


@Injectable({
  providedIn: 'root'
})
export class DBReaderService {
  private DBReaderFactory = new DBReaderFactory();
  private DBReader?: DBReader

  async openDatabase(database: Buffer): Promise<boolean> {
    const dbreader = await this.DBReaderFactory.createDBReader(database);
    this.DBReader = dbreader;
    return true;
  }

  db(): DBReader {
    if(!this.DBReader) throw Error("[Error] DBReaderService: Database used before initialization.")
    return this.DBReader!
  }
}
