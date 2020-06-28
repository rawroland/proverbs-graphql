import { Proverb, User } from '../types';
import { v4 as uuid } from 'uuid';

const Mutation = {
  createProverb(parent: any, args: any, { db }: any, info: any): Proverb {
    const proverbInput = args.proverb;
    const { proverbs }: { proverbs: Proverb[] } = db;
    const proverbExists = proverbs
      .find((proverb: Proverb): boolean => {
        return proverb.title.toLowerCase() === proverbInput.title.toLowerCase();
      });
    if (proverbExists) {
      throw new Error(`Proverb with the title '${proverbInput.title}' already exists.`);
    }

    const proverb: Proverb = {
      uuid: uuid(),
      title: proverbInput.title,
      meaning: proverbInput.meaning,
      reviewers: [],
    };
    proverbs.push(proverb);

    return proverb;
  },
  createUser(parent: any, { user: userInput }: { user: User }, { db }: any, info: any): User {
    const { users }: { users: User[] } = db;
    const userAlreadyExists = users.find((user: User): boolean => {
      return userInput.name === user.name && userInput.surname === user.surname;
    });
    if (userAlreadyExists) {
      throw new Error(`User '${userInput.name} ${userInput.surname}' already exists.`);
    }
    const user: User = {
      ...userInput,
      uuid: uuid(),
      reviewed_proverbs: [],
    };
    users.push(user);

    return user;
  },
};

export { Mutation as default };
