import * as Config from "config"
import { Action } from "../../server/entities/action";
import { Komposition } from "../../server/entities/komposition";
import { Statement } from "../../server/entities/statement";
import * as Server from "../../server/server";

const server = Server.init(Config);
const defaultTimeout = 3000;

describe("komposition resource tests", () => {
    let id;
    const expectedType = "ansible";
    let validAction;
    let validStatements;
    let validKomposition;

    beforeAll((done) => {
        setTimeout(() => {
            done();
        }, 2000);
    });

    beforeEach(() => {
        validAction = new Action("name", expectedType, "echo 'hi'");
        validStatements = [new Statement("tell the dog to shut up")];
        validKomposition = new Komposition(null, "cool name", validStatements, validAction);
    });

    describe("Basic CRUD valid payload to /kompositions/", () => {
        it("POST should return the resource with id populated", (done) => {
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

        it("GET /kompositions/{id} should return a valid komposition", (done) => {
            server.inject({ method: "GET", url: "/kompositions/" + id }, (res) => {
                expect(res.statusCode).toBe(200);
                const komposition: Komposition = JSON.parse(res.payload);
                expect(komposition.action.type).toBe(expectedType);
                done();
            });
        }, defaultTimeout);

        it("DELETE /kompositions/{id} should delete the kompositions", (done) => {
            server.inject({ method: "DELETE", url: "/kompositions/" + id }, (res) => {
                expect(res.statusCode).toBe(200);
                // server.inject({ method: "GET", url: "/kompositions/" + id }, (r) => {
                //     expect(r.statusCode).toBe(404);
                //     const komposition: Komposition = JSON.parse(r.payload);
                //     expect(komposition.action.type).toBe(expectedType);
                //     done();
                // });
                done();
            });
        }, defaultTimeout);


    });

    describe("when POSTing invalid payload to /kompositions/ ", () => {
        it("a null Statement array should return result in a bad request", (done) => {
            const payload = new Komposition("", "cool name", null, validAction);
            server.inject({ method: "POST", url: "/kompositions/", payload }, (res) => {
                expect(res.statusCode).toBe(400);
                done();
            });
        }, defaultTimeout);

        it("an empty Statement array should return result in a bad request", (done) => {
            const payload = new Komposition("", "cool name", [], validAction);
            server.inject({ method: "POST", url: "/kompositions/", payload }, (res) => {
                expect(res.statusCode).toBe(400);
                done();
            });
        }, defaultTimeout);

        it("an null Action should return result in a bad request", (done) => {
            const payload = new Komposition("", "cool name", validStatements, null);
            server.inject({ method: "POST", url: "/kompositions/", payload }, (res) => {
                expect(res.statusCode).toBe(400);
                done();
            });
        }, defaultTimeout);

        it("an Action without a name should return result in a bad request", (done) => {
            const payload = new Komposition("", "cool name", validStatements, new Action("", "foo", "bar"));
            server.inject({ method: "POST", url: "/kompositions/", payload }, (res) => {
                expect(res.statusCode).toBe(400);
                done();
            });
        }, defaultTimeout);

        it("an Action without a type should return result in a bad request", (done) => {
            const payload = new Komposition("", "cool name", validStatements, new Action("foo", "", "bar"));
            server.inject({ method: "POST", url: "/kompositions/", payload }, (res) => {
                expect(res.statusCode).toBe(400);
                done();
            });
        }, defaultTimeout);

        it("an Action without a command should return result in a bad request", (done) => {
            const payload = new Komposition("", "cool name", validStatements, new Action("foo", "bar", ""));
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

    // it("GET /kompositions/findAction/ should return a valid komposition when searching for a known valid statement", (done) => {
    //     server.inject({ method: "GET", url: "/kompositions/findAction/Set the computer volume to 12" }, (res) => {
    //         expect(res.statusCode).toBe(200);
    //         const komposition: Komposition = JSON.parse(res.payload);
    //         expect(komposition.action.type).toBe(expectedType);
    //         done();
    //     });
    // }, defaultTimeout);

});
