import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DictionaryReader, DictionaryReaderFactory } from 'src/classes/dictreader';

@Injectable({
  providedIn: 'root'
})
export class DictionaryReaderService {
  constructor() {
    this._init()
  }

  private DictionaryReaderFactory = new DictionaryReaderFactory();
  private DictionaryReader?: DictionaryReader

  public isInitialized: Observable<boolean> = of(false)

  private async _init() {
    this.DictionaryReader = await this.DictionaryReaderFactory.createDictionaryReader(await this._getDictionaryFile())
    this.isInitialized = of(true)
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
    const dictreader = await this.DictionaryReaderFactory.createDictionaryReader(dictionary)
    this.DictionaryReader = dictreader
    this._saveDictionaryFile(dictionary)
    return true;
  }

  dict(): DictionaryReader {
    if(!DictionaryReader) throw Error("[Error] DictionaryReaderService: Dictionary used before initialization.")
    
    return this.DictionaryReader!
  }
}
