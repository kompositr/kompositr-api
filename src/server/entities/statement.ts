export class Statement {
    constructor(private phrase: string ) {}
    public tokens() {
        return this.phrase.split(" ");
    }
}
