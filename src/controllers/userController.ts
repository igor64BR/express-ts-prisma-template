import type { IUserRepository } from "#interfaces/IUserRepository.js";
import type { ICreateUser } from "#interfaces/user.interfaces.js";

export class UserController {
  constructor(private readonly _userRepository: IUserRepository) {}

  public async getAll() {
    return await this._userRepository.findAll();
  }

  public async getById(id: number) {
    return await this._userRepository.findById(id);
  }

  public async create(data: ICreateUser) {
    return await this._userRepository.create(
      {
        name: data.name,
        email: data.email,
      },
      data.posts.map((p) => ({
        title: p.title,
        content: p.content,
        published: p.published,
      })),
    );
  }
}
