import Router from "@koa/router";
import healthController from "../controllers/health";
import { validate } from "../middleware/validation";
import { Context } from "koa";

const ping = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = healthController.ping();
};

ping.validationScheme = null;

const getVersion = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = healthController.getVersion();
};

getVersion.validationScheme = null;

export default (router: Router): void => {
  const healthRouter = new Router({
    prefix: "/health",
  });

  healthRouter.get("/ping", validate(ping.validationScheme), ping);
  healthRouter.get(
    "/version",
    validate(getVersion.validationScheme),
    getVersion
  );

  router.use(healthRouter.routes()).use(healthRouter.allowedMethods());
};
