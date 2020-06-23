import { Proverb } from '../types';
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
};

export { Mutation as default };
