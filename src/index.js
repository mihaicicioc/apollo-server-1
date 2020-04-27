/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const { ApolloServer } = require('apollo-server');

const { typeDefs, resolvers } = require('./schema');

const PORT = 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: ({ req, res }) => {
        // the entry point in the entire flow.

        // here you can add authentication/authorization.

        const contextObj = {
            isAdmin: false,
        };

        if (req.headers && req.headers.authorization && req.headers.authorization === 'admin') {
            contextObj.isAdmin = true;
        }

        // what you return here will be the "context" param in the resolvers
        return contextObj;
    },
    formatError: (error) => {
        // formatError is called before formatResponse.
        return error;
    },
    formatResponse: (response, query) => {
        // formatResponse is called after formatError.
        return response;
    },
});

server.listen({
    port: PORT,
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
