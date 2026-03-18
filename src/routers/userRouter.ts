import { UserController } from "#controllers/userController.js";
import type { ICreateUser } from "#interfaces/user.interfaces.js";
import { DbContext } from "#prisma/dbContext.js";
import { UserRepository } from "#repositories/userRepository.js";
import { Router, type Request } from "express";
import { StatusCodes } from "http-status-codes";

export const userRouter = Router();

const dbContext = new DbContext();
const repository = new UserRepository(dbContext);
const controller = new UserController(repository);

userRouter.get("/", async (_, res) => {
  const users = await controller.getAll();

  res.json(users);
});

userRouter.get("/:id", async (req, res) => {
  const user = await controller.getById(Number(req.params.id));

  if (!user) {
    res.status(StatusCodes.NOT_FOUND);
    return;
  }

  res.json(user);
});

userRouter.post("/", async (req: Request<unknown, unknown, ICreateUser>, res) => {
  const user = await controller.create(req.body);
  res.json(user);
});
