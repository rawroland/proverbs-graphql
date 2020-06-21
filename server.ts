import { GraphQLServer } from 'graphql-yoga';
import { Proverb, User } from './src/types';
import { v4 as uuid } from 'uuid';

const typeDefs: string = `
  type Query {
    proverbs(query: String): [Proverb]!
    users: [User!]!
  }

  type Mutation {
    createProverb(title: String!, meaning: String!): Proverb!
  }

  type Proverb {
    uuid: ID!
    title: String!
    meaning: String!
    reviewers: [User!]!
  }

  type User {
    uuid: ID!
    name: String!
    surname: String!
    reviewed_proverbs: [Proverb!]!
  }
`;

const users: User[] = [
  {
    uuid: uuid(),
    name: 'Roland',
    surname: 'Awemo',
    reviewed_proverbs: [],
  },
  {
    uuid: uuid(),
    name: 'Jane',
    surname: 'Doe',
    reviewed_proverbs: [],
  },
];

const proverbs: Proverb[] = [
  {
    uuid: uuid(),
    title: 'All is well that ends well',
    meaning: 'A happy ending makes up for everything that has gone before.',
    reviewers: [users[0].uuid],
  },
  {
    uuid: uuid(),
    title: 'Penny wise and a pound foolish',
    meaning: 'Prudent and thrifty with small amounts of money, but wasteful and profligate with large amounts.',
    reviewers: [users[0].uuid, users[1].uuid],
  },
];

users[0].reviewed_proverbs = [proverbs[0].uuid, proverbs[1].uuid];
users[1].reviewed_proverbs = [proverbs[0].uuid];

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
  Proverb: {
    reviewers(proverb: Proverb, args: any, context: any, info: any): User[] {
      return users.filter((user: User): boolean => proverb.reviewers.includes(user.uuid));
    },
  },
  User: {
    reviewed_proverbs(user: User, args: any, context: any, info: any): Proverb[] {
      return proverbs.filter((proverb: Proverb): boolean => user.reviewed_proverbs.includes(proverb.uuid));
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
        meaning: args.meaning,
        reviewers: [],
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
