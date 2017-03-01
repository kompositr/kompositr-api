import { Statement } from "../../lib/entities/statement";

describe("Statement tokenization", () => {
    let statement;
    let expected;

    beforeEach(() => {
        statement = new Statement("Sally bought a pair of shoes");
        expected = ["Sally", "bought", "a", "pair", "of", "shoes"];
    });

    it("should tokenize the phrase into an array of strings", () => {
        expect(statement.tokens()).toEqual(expected);
    });
});
