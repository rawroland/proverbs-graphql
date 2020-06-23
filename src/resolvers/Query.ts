import { Proverb, User } from '../types';

const Query = {
  proverbs(parent: any, args: any, { db }: any, info: any): Proverb[] {
    const { proverbs }: { proverbs: Proverb[] } = db;
    if (!args.query) {
      return proverbs;
    }
    return proverbs.filter((proverb: Proverb) => {
      return proverb.title.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  users(parent: any, args: any, { db }: any, info: any): User[] {
    return db.users;
  },
};

export { Query as default };
