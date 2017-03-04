import * as Config from "config"
import { Action } from "../../server/entities/action";
import { Komposition } from "../../server/entities/komposition";
import { Statement } from "../../server/entities/statement";
import * as Server from "../../server/server";

const server = Server.init(Config);
const defaultTimeout = 30000;

describe("komposition resource tests", () => {
    let id;
    const expectedType = "ansible";
    let validAction;
    let validStatements;
    let validKomposition;

    beforeEach(() => {
        validAction = new Action("name", expectedType, "echo 'hi'");
        validStatements = [new Statement("tell the dog to shut up")];
        validKomposition = new Komposition(null, validStatements, validAction);
    });

    describe("when POSTing valid payload to /kompositions/", () => {
        it("should return the resource with id populated", (done) => {
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(validKomposition));
            server.inject({ method: "POST", url: "/kompositions/", payload: validKomposition }, (res) => {
                // tslint:disable-next-line:no-console
                console.log(res.payload);
                expect(res.statusCode).toBe(200);
                const komposition: Komposition = JSON.parse(res.payload);
                expect(komposition.id).toBeTruthy();
                expect(komposition.action.type).toBe(expectedType);
                id = komposition.id;
                done();
            });
        }, defaultTimeout);
    });

    describe("when POSTing invalid payload to /kompositions/ ", () => {
        it("a null Statement array should return result in a bad request", (done) => {
            const payload = new Komposition("", null, validAction);
            server.inject({ method: "POST", url: "/kompositions/", payload }, (res) => {
                expect(res.statusCode).toBe(400);
                done();
            });
        }, defaultTimeout);

        it("an empty Statement array should return result in a bad request", (done) => {
            const payload = new Komposition("", [], validAction);
            server.inject({ method: "POST", url: "/kompositions/", payload }, (res) => {
                expect(res.statusCode).toBe(400);
                done();
            });
        }, defaultTimeout);

        it("an null Action should return result in a bad request", (done) => {
            const payload = new Komposition("", validStatements, null);
            server.inject({ method: "POST", url: "/kompositions/", payload }, (res) => {
                expect(res.statusCode).toBe(400);
                done();
            });
        }, defaultTimeout);

        it("an Action without a name should return result in a bad request", (done) => {
            const payload = new Komposition("", validStatements, new Action("", "foo", "bar"));
            server.inject({ method: "POST", url: "/kompositions/", payload }, (res) => {
                expect(res.statusCode).toBe(400);
                done();
            });
        }, defaultTimeout);

        it("an Action without a type should return result in a bad request", (done) => {
            const payload = new Komposition("", validStatements, new Action("foo", "", "bar"));
            server.inject({ method: "POST", url: "/kompositions/", payload }, (res) => {
                expect(res.statusCode).toBe(400);
                done();
            });
        }, defaultTimeout);

        it("an Action without a command should return result in a bad request", (done) => {
            const payload = new Komposition("", validStatements, new Action("foo", "bar", ""));
            server.inject({ method: "POST", url: "/kompositions/", payload }, (res) => {
                expect(res.statusCode).toBe(400);
                done();
            });
        }, defaultTimeout);
    });

    it("GET /kompositions/ should return all the kompositions", (done) => {
        server.inject({ method: "GET", url: "/kompositions/" }, (res) => {
            expect(res.statusCode).toBe(200);
            done();
        });
    }, defaultTimeout);

    it("GET /kompositions/{id} should return a valid komposition", (done) => {
        server.inject({ method: "GET", url: "/kompositions/" + id }, (res) => {
            expect(res.statusCode).toBe(200);
            const komposition: Komposition = JSON.parse(res.payload);
            expect(komposition.action.type).toBe(expectedType);
            done();
        });
    }, defaultTimeout);
});
