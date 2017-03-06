export class Statement {
    constructor(public readonly phrase: string ) {}
    public tokens() {
        return this.phrase.split(" ");
    }
}
