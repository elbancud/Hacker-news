import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { context } from './context';
import { schema } from './schema';
const server = new ApolloServer({
  schema,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const DEFAULT_PORT = 3000;
server.listen(DEFAULT_PORT).then(({ url }) => {
  console.log(`🚀 Server ready at http://localhost:${url}`);
});
