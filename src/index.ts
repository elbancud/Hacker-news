import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
/**
 * Creates a basic apollo server with schema config *
 * @type {*} */

const server = new ApolloServer({
  schema,
});

const port = 3000;
server.listen({ port }).then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
