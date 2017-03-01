import { Action } from "./action";
import { Statement } from "./statement";

export class Komposition {
    constructor(public id: string, protected statements: Statement[], protected action: Action) {}
}
