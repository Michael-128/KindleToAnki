export class CSVParser {
    constructor() {  }

    static getParsed(headers: string[], values: string[][]) {
        let parsedValues = [headers.join(",")];
        console.log(values)
        parsedValues = parsedValues.concat(values.map(value => value.join(",")));
        
        const csv = parsedValues.join("\n")
        
        return csv
    }
}