import { Context, Next } from "koa";
import * as userController from "../controllers/user";
import ServiceError from "../middleware/serviceError";

export const requireAuthentication = async (ctx: Context, next: Next) => {
  const sessionID = ctx.cookies.get("sessionID");

  if (!sessionID) {
    throw ServiceError.unauthorized("You need to be logged in to access this");
  }

  const session = await userController.verifySession(sessionID);

  ctx.state.session = session;

  return next();
};

export const checkID = (ctx: Context, next: Next) => {
  const { userID } = ctx.params;
  const { session } = ctx.state.session;

  if (session.teacherID !== parseInt(userID)) {
    throw ServiceError.forbidden("You are not allowed to access this");
  }

  return next();
};
