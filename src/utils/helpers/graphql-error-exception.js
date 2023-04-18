const { GraphQLError } = require("graphql");

exports.GraphqlErrorException = (code, message) => {
    const graphqlError = new GraphQLError(message, {
        extensions: {
          code,
        },
    });
    return graphqlError;
}