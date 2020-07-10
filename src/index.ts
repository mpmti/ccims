import { mockServer, IMocks } from "graphql-tools";
import * as graphql from "graphql";
import { readFileSync } from "fs";
import express from "express";
import { graphqlHTTP, Options } from "express-graphql";

function randomColor(): string {
    var out = "#";
    for (var i = 0; i < 3; i++) {
        out += Math.floor(Math.random() * 255).toString(16).padStart(2, "0");
    }
    return out;
}

const schemaFile = readFileSync("schemas/schema.graphql").toString();

const mockData: IMocks = {
    Int: () => 0,
    String: () => "A text",
    JSON: () => JSON.stringify({ this: "is", a: ["test"] }),
    Colour: randomColor,
    TimeSpan: () => Math.random() * 31536000000,
    Date: () => new Date().toISOString(),
}

const apiMock = mockServer(schemaFile, mockData);
const schema = graphql.buildSchema(schemaFile);


const server = express();

const graphqlOptions: Options = {
    graphiql: true,
    schema: schema,
    rootValue: mockServer
};

server.use("/api", graphqlHTTP(graphqlOptions));

server.listen(8080);