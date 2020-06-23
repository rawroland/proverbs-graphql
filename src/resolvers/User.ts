import { Proverb, User as UserType } from '../types';

const User = {
  reviewed_proverbs(user: UserType, args: any, { db }: any, info: any): Proverb[] {
    const { proverbs }: { proverbs: Proverb[] } = db;
    return proverbs.filter((proverb: Proverb): boolean => {
      return user.reviewed_proverbs.includes(proverb.uuid);
    });
  },
};

export { User as default };
