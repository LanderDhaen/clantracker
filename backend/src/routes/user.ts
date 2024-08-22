import Router from "@koa/router";
import * as authController from "../controllers/user";
import { validate } from "../middleware/validation";
import { Context } from "koa";
import Joi from "joi";

const login = async (ctx: Context) => {
  const { username, password } = ctx.request.body as {
    username: string;
    password: string;
  };

  const session = await authController.login(username, password);

  ctx.cookies.set("sessionID", session.sessionID);

  ctx.body = { userID: session.userID };
};

login.validationScheme = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const check = async (ctx: Context) => {};

check.validationScheme = {};

export default (router: Router): void => {
  const userRouter = new Router({
    prefix: "/users",
  });

  userRouter.post("/login", validate(login.validationScheme), login);
  userRouter.get("/check", validate(check.validationScheme), check);

  router.use(userRouter.routes()).use(userRouter.allowedMethods());
};
