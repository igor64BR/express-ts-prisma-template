export interface ICreateUser {
  name: string | null;
  email: string;
  posts: ICreateUserPost[];
}

export interface ICreateUserPost {
  title: string;
  content: string | null;
  published: boolean;
}
