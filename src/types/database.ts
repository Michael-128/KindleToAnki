export interface IWord {
    id: string
    word: string
    stem: string
    lang: string
    category: number
    timestamp: number
    profileid: string
}

export interface ILookup {
    id: string
    word_key: string
    book_key: string
    dict_key: string
    pos: string
    usage: string
    timestamp: number
    getWord(): IWord
}

export interface IDictInfo {
    id: string
    asin: string
    langin: string
    langout: string
}

export interface IBookInfo {
    id: string
    asin: string
    guid: string
    lang: string
    title: string
    authors: string
}