import type { Post, User } from "#prisma/generated/prisma/client.js";

export interface IUserRepository {
  create(data: Omit<User, "id">, posts: Omit<Post, "id" | "authorId">[]): Promise<User>;
  delete(id: number): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<null | User>;
  update(id: number, data: Omit<User, "id">): Promise<User>;
}
