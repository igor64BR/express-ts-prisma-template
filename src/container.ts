import { UserController } from "#controllers/userController.js";
import type { IUserRepository } from "#interfaces/IUserRepository.js";
import { DbContext } from "#prisma/dbContext.js";
import { UserRepository } from "#repositories/userRepository.js";
import { Container } from "inversify";

const container = new Container();

container.bind(DbContext).toSelf().inSingletonScope();
container.bind<IUserRepository>(UserRepository).toSelf().inTransientScope();
container.bind(UserController).toSelf().inTransientScope();

export { container };
