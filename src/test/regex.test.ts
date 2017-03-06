describe("regex thing", () => {
    const regex = /Hello (\w+), you have been awarded (\d+) points for being active for more than (\d+) days/g;
    const stringToMatch = "Hello john, you have been awarded 12 points for being active for more than 3 days";

    it("se into an array of strings", () => {
        const result = regex.exec(stringToMatch);
        expect(result[1]).toEqual("john");
        expect(result[2]).toEqual("12");
        expect(result[3]).toEqual("3");
    });
 });
