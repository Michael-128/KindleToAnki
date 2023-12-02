import * as initSqlJs from "sql.js";
import { Database } from "sql.js";
import { IWord, IBookInfo, IDictInfo, ILookup } from '../types/database'
import { IStatus, Status } from "src/types/IStatus";
import { Observable, of } from "rxjs";

export class DBReader implements IStatus {
    db!: Database

    public status: Observable<Status> = of(Status.UNINITIALIZED)

    async initDB(database: Buffer) {
        this.status = of(Status.INITIALIZING)
        const SQL = await initSqlJs({locateFile: url => "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.9.0/sql-wasm.wasm"})
        this.db = new SQL.Database(new Uint8Array(database))
        this.status = of(Status.INITIALIZED)
    }

    getDictById(id: string): IDictInfo {
        const stmt = this.db.prepare("select * from DICT_INFO where id=$dictid")
        stmt.bind({$dictid: id})
        stmt.step()
        const value = stmt.getAsObject()
        
        stmt.free()

        return {
            id: value['id'] as string,
            asin: value['asin'] as string,
            langin: value['langin'] as string,
            langout: value['langout'] as string,
        }
    }

    getAllBooks(): IBookInfo[] {
        const books: IBookInfo[] = []

        const values = this.db.exec("select * from BOOK_INFO")[0].values

        values.forEach(value => { 
            books.push({
                id: value[0] as string,
                asin: value[1] as string,
                guid: value[2] as string,
                lang: value[3] as string,
                title: value[4] as string,
                authors: value[5] as string,
            })
        })

        return books
    }

    getBookById(id: string): IBookInfo {
        const stmt = this.db.prepare("select * from BOOK_INFO where id=$bookid")
        stmt.bind({$bookid: id})
        stmt.step()
        const value = stmt.getAsObject()
        
        stmt.free()

        return {
            id: value['id'] as string,
            asin: value['asin'] as string,
            guid: value['guid'] as string,
            lang: value['lang'] as string,
            title: value['title'] as string,
            authors: value['authors'] as string,
        }
    }


    getAllLookups(): ILookup[] {
        const lookups: ILookup[] = []

        const values = this.db.exec("select * from LOOKUPS")[0].values

        values.forEach(value => { 
            const getWord = (): IWord => {
                return this.getWordById(value[1] as string)
            }

            lookups.push({
                id: value[0] as string,
                word_key: value[1] as string,
                book_key: value[2] as string,
                dict_key: value[3] as string,
                pos: value[4] as string,
                usage: value[5] as string,
                timestamp: value[6] as number,
                getWord: getWord
            })
        })

        return lookups
    }

    getLookupById(id: string): ILookup {
        const stmt = this.db.prepare("select * from LOOKUPS where id=$lookupid")
        stmt.bind({$lookupid: id})
        stmt.step()
        const value = stmt.getAsObject()
        
        stmt.free()

        const getWord = (): IWord => {
            return this.getWordById(value["word_key"] as string)
        }

        return {
            id: value['id'] as string,
            word_key: value['word_key'] as string,
            book_key: value['book_key'] as string,
            dict_key: value['dict_key'] as string,
            pos: value['pos'] as string,
            usage: value['usage'] as string,
            timestamp: value['timestamp'] as number,
            getWord: getWord
        }
    }

    getAllWords(): IWord[] {
        const words: IWord[] = []

        const values = this.db.exec("select * from WORDS")[0].values

        values.forEach(value => {
            words.push({
                id: value[0] as string,
                word: value[1] as string, 
                stem: value[2] as string, 
                lang: value[3] as string, 
                category: value[4] as number,
                timestamp: value[5] as number,
                profileid: value[6] as string
            })
        })
        
        return words
    }

    getWordById(id: string): IWord {
        const stmt = this.db.prepare("select * from WORDS where id=$wordid")
        stmt.bind({$wordid: id})
        stmt.step()
        const value = stmt.getAsObject()
        
        stmt.free()

        return {
            id: value["id"] as string,
            word: value["word"] as string, 
            stem: value["stem"] as string, 
            lang: value["lang"] as string, 
            category: value["category"] as number,
            timestamp: value["timestamp"] as number,
            profileid: value["profileid"] as string
        }
    }
}