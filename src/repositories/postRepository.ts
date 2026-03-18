import type { IPostRepository } from "#interfaces/IPostRepository.js";
import type { DbContext } from "#prisma/dbContext.js";
import type { Post } from "#prisma/generated/prisma/client.js";

export class PostRepository implements IPostRepository {
  private _dbSet;

  constructor(dbContext: DbContext) {
    this._dbSet = dbContext.client.post;
  }

  public async create(data: Omit<Post, "id">): Promise<Post> {
    return this._dbSet.create({ data });
  }

  public async delete(id: number): Promise<Post> {
    return this._dbSet.delete({ where: { id } });
  }
  public async findAll(): Promise<Post[]> {
    return this._dbSet.findMany();
  }

  public async findById(id: number): Promise<null | Post> {
    return await this._dbSet.findFirst({ where: { id } });
  }
  public async update(id: number, data: Omit<Post, "id">): Promise<Post> {
    return this._dbSet.update({ where: { id }, data });
  }
}
