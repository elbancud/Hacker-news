import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { schema } from './schema';
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const DEFAULT_PORT = 3000;
server.listen(DEFAULT_PORT).then(({ url }) => {
  console.log(`🚀 Server ready at http://localhost:${url}`);
});
