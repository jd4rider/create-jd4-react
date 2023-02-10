import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchema } from "type-graphql";
import http from 'http';
import path from 'path';


import { BookResolver } from "./resolvers/BookResolver";

async function main() {
  await createConnection();
  const app = express();
  const httpServer = http.createServer(app);
  const schema = await buildSchema({ resolvers: [BookResolver], validate: false });
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ]
  });
  await server.start();

  server.applyMiddleware({ app });


  app.use(express.static(path.join(__dirname, '../client/dist')));


  //app.get('/', function(req, res) {
  //  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  //});

  await new Promise<void>(resolve => app.listen({ port: 3000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
}

main();
