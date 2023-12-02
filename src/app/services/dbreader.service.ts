import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DBReader } from 'src/classes/dbreader';


@Injectable({
  providedIn: 'root'
})
export class DBReaderService {
  private DBReader: DBReader = new DBReader()

  async openDatabase(database: Buffer): Promise<boolean> {
    await this.DBReader.initDB(database);
    return true;
  }

  db(): DBReader {
    return this.DBReader
  }
}
