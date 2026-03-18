import type { Post } from "#prisma/generated/prisma/client.js";

export interface IPostRepository {
  create(data: Omit<Post, "id">): Promise<Post>;
  delete(id: number): Promise<Post>;
  findAll(): Promise<Post[]>;
  findById(id: number): Promise<null | Post>;
  update(id: number, data: Omit<Post, "id">): Promise<Post>;
}
