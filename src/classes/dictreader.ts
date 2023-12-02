import { ITerm } from 'src/types/dictionary'
import * as JSZip from '../../node_modules/jszip'
import { IStatus, Status } from 'src/types/IStatus'
import { Observable, of } from 'rxjs'

export class DictionaryReader implements IStatus {
    private title: string = ""
    private termBank: ITerm[] = []

    public status: Observable<Status> = of(Status.UNINITIALIZED)

    public async initDict(dictFile: Buffer) {
        this.status = of(Status.INITIALIZING)

        const jszip = JSZip()
        const content = await jszip.loadAsync(dictFile)

        const index = content.file("index.json")

        if(index)
            var indexJson = JSON.parse(await index.async("string"))
        

        const termBanks = content.filter((relativePath, file) => {
            if(relativePath.includes("term_bank"))
                return true

            return false
        })

        let termBank: ITerm[] = []
        
        for await (const bank of termBanks.map(bank => bank.async("string"))) {
            termBank = termBank.concat(JSON.parse(bank)) 
        }

        termBank = termBank.flatMap((term: any): ITerm => {
            return {
                term: term[0] as string,
                reading: term[1] as string,
                popularity: term[4] as number,
                definitions: term[5],
                sequence: term[6] as number
            }
        })

        this.title = indexJson.title
        this.termBank = termBank

        this.status = of(Status.INITIALIZED)
    }

    public getDefinitions(keyword: string): string[] {
        const matchingTerms = this.termBank.filter(term => {
            return term.term == keyword
        })

        return matchingTerms.sort((term1, term2) => {
            return term2.popularity - term1.popularity
        }).flatMap((term) => {
            return term.definitions
        })
    }

    public getTermBank() {
        return this.termBank
    }
}
