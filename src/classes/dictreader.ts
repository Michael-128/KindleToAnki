import * as JSZip from '../../node_modules/jszip'

export class DictionaryReaderFactory {
    async createDictionaryReader(dictFile: Buffer): DictionaryReader {
        const jszip = JSZip()
        const content = await jszip.loadAsync(dictFile)
        console.log(content.files)
    }
}

export class DictionaryReader {

}
