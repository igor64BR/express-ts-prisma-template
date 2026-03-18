import type { DbContext } from "#prisma/dbContext.js";
import type { Post, User } from "#prisma/generated/prisma/client.js";

import { type IUserRepository } from "../interfaces/IUserRepository.js";

export class UserRepository implements IUserRepository {
  private _dbSet;

  constructor(dbContext: DbContext) {
    this._dbSet = dbContext.client.user;
  }

  public async create(data: Omit<User, "id">, posts: Omit<Post, "id" | "authorId">[]): Promise<User> {
    return this._dbSet.create({
      data: {
        ...data,
        posts: {
          create: posts.map((post) => ({
            title: post.title,
            content: post.content,
            published: post.published,
          })),
        },
      },
    });
  }

  public async delete(id: number): Promise<User> {
    return this._dbSet.delete({ where: { id } });
  }
  public async findAll(): Promise<User[]> {
    return this._dbSet.findMany({
      include: { posts: true },
    });
  }

  public async findById(id: number): Promise<null | User> {
    return await this._dbSet.findFirst({
      where: { id },
      include: { posts: true },
    });
  }
  public async update(id: number, data: Omit<User, "id">): Promise<User> {
    return this._dbSet.update({ where: { id }, data });
  }
}
