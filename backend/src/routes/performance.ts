import Joi from "joi";
import Router from "@koa/router";
import performanceController from "../controllers/performance";
import { validate } from "../middleware/validation";
import { Context } from "koa";

const getAllPerformances = async (ctx: Context) => {
  const data = await performanceController.getAllPerformances();
  ctx.body = data;
};

getAllPerformances.validationScheme = null;

export default (router: Router): void => {
  const performanceRouter = new Router({
    prefix: "/performances",
  });

  performanceRouter.get(
    "/",
    validate(getAllPerformances.validationScheme),
    getAllPerformances
  );

  router
    .use(performanceRouter.routes())
    .use(performanceRouter.allowedMethods());
};
