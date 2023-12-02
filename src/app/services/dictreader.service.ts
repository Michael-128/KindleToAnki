import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DictionaryReader } from 'src/classes/dictreader';

@Injectable({
  providedIn: 'root'
})
export class DictionaryReaderService {
  constructor() {
    this._init()
  }

  private DictionaryReader: DictionaryReader = new DictionaryReader()

  private async _init() {
    this.DictionaryReader.initDict(await this._getDictionaryFile())
  }

  private async _saveDictionaryFile(dictionary: Buffer) {
    const directory = await navigator.storage.getDirectory()
    const fileHandle = await directory.getFileHandle("dictionary.zip", {create: true})
    const writeStream = await (fileHandle as any).createWritable()

    await writeStream.write(dictionary)
    await writeStream.close()
    return true
  }

  private async _getDictionaryFile(): Promise<Buffer> {
    const directory = await navigator.storage.getDirectory()
    const fileHandle = await directory.getFileHandle("dictionary.zip")
    const file = await fileHandle.getFile()
    const buffer = await file.arrayBuffer()
    return buffer as Buffer
  }

  async openDictionary(dictionary: Buffer): Promise<boolean> {
    this.DictionaryReader.initDict(dictionary)
    this._saveDictionaryFile(dictionary)
    return true;
  }

  dict(): DictionaryReader {
    return this.DictionaryReader
  }
}
