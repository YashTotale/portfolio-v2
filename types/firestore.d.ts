export type WithId<T> = T & {
  id: string;
};

export interface Schema {
  users: PublicUserDoc;
  users_immutable: ImmutableUserDoc;
  books: BookDoc;
}

export type Collections = keyof Schema;

export interface PublicUserDoc {
  name: string;
  picture: string;
}

export interface ImmutableUserDoc {
  email: string;
}

export interface BookDoc {
  likes: string[];
}
