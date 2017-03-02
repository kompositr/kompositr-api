import { Action } from "./action";
import { Statement } from "./statement";

export class Komposition {
    constructor(public id: string, public readonly statements: Statement[], public readonly action: Action) {}
}
