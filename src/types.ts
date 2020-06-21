export type Proverb = {
  uuid: string,
  title: string,
  meaning: string,
  reviewers: string[]
}

export type User = {
  uuid: string,
  name: string,
  surname: string,
  reviewed_proverbs: string[]
}
