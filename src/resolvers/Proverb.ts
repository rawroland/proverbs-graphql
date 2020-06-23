import { Proverb as ProverbType, User } from '../types';

const Proverb = {
  reviewers(proverb: ProverbType, args: any, { db }: any, info: any): User[] {
    const { users }: { users: User[] } = db;
    return users.filter((user: User): boolean => proverb.reviewers.includes(user.uuid));
  },
};

export { Proverb as default };
