import { GraphQLServer } from 'graphql-yoga';
import { Proverb, User } from './src/types';
import { v4 as uuid } from 'uuid';

const users: User[] = [
  {
    uuid: uuid(),
    name: 'Roland',
    surname: 'Awemo',
  },
];

const proverbs: Proverb[] = [
  {
    uuid: uuid(),
    title: 'All is well that ends well',
    meaning: 'A happy ending makes up for everything that has gone before.',
  },
  {
    uuid: uuid(),
    title: 'Penny wise and a pound foolish',
    meaning: ' Prudent and thrifty with small amounts of money, but wasteful and profligate with large amounts.',
  },
];

const typeDefs: string = `
  type Query {
    proverbs(query: String): [Proverb]!
    users: [User!]!
  }

  type Mutation {
    createProverb(title: String!, meaning: String!): Proverb!
  }

  type Proverb {
    uuid: String!
    title: String!
    meaning: String!
  }

  type User {
    uuid: String!
    name: String!
    surname: String!
  }
`;

const resolvers: any = {
  Query: {
    proverbs(parent: any, args: any, context: any, info: any): Proverb[] {
      if (!args.query) {
        return proverbs;
      }
      return proverbs.filter(proverb => proverb.title.toLowerCase().includes(args.query.toLowerCase()));
    },
    users(parent: any, args: any, context: any, info: any): User[] {
      return users;
    },
  },
  Mutation: {
    createProverb(parent: any, args: any, context: any, info: any): Proverb {
      const proverbExists = proverbs.find(proverb => proverb.title.toLowerCase() === args.title.toLowerCase());
      if (proverbExists) {
        throw new Error(`Proverb with the title '${args.title}' already exists.`);
      }

      const proverb: Proverb = {
        uuid: uuid(),
        title: args.title,
        meaning: args.meaning
      };
      proverbs.push(proverb);

      return proverb;
    },
  },
};

const server: GraphQLServer = new GraphQLServer({
  typeDefs,
  resolvers,
});

const port = 3100;
server.start(
  {
    port,
    debug: true,
  },
  () => console.log(`Server was started on port ${port}`),
);
