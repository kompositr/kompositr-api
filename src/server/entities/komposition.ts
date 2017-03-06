import { Action } from "./action";
import { Statement } from "./statement";

export class Komposition {
    constructor(public id: string, public readonly name: String, public readonly statements: Statement[], public readonly action: Action) {}
}
