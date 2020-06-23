import { Proverb, User } from './types';
import { v4 as uuid } from 'uuid';

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

const db = { users, proverbs };

export { db as default }
