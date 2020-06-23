import { GraphQLServer } from 'graphql-yoga';
import db from './src/db';
import Query from './src/resolvers/Query';
import Mutation from './src/resolvers/Mutation';
import Proverb from './src/resolvers/Proverb';
import User from './src/resolvers/User';

const server: GraphQLServer = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    User,
    Proverb,
  },
  context: { db },
});

const port = 3100;
server.start(
  {
    port,
    debug: true,
  },
  () => console.log(`Server was started on port ${port}`),
);
