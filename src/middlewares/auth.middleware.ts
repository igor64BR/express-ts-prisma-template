import type { RequestHandler } from "express";

export const authMiddleware: RequestHandler = (_, __, next) => {
  next();
};
