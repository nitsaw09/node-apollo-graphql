const express = require('express');
const { importSchema } = require('graphql-import');
const resolvers = require('./src/graphql/resolver');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config()

const app = express();

// Construct a schema, using GraphQL schema language
const typeDefs = importSchema('./src/graphql/schema.gql');

// initialize the apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// start the apollo server
server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
});