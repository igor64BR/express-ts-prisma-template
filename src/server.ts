import { PORT } from "#config.js";
import { authMiddleware } from "#middlewares/auth.middleware.js";
import { userRouter } from "#routers/userRouter.js";
import express from "express";

const app = express();
const port = PORT;

if (!port) throw new Error("Env Variable PORT is undefined");

app.use(express.json());
app.use(authMiddleware);

app.get("/", (_, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
