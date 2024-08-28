import Router from "@koa/router";
import * as performanceController from "../controllers/performance";
import { validate } from "../middleware/validation";
import { Context } from "koa";
import Joi from "joi";

const getAllPerformances = async (ctx: Context) => {
  const data = await performanceController.getAllPerformances();
  ctx.body = data;
};

getAllPerformances.validationScheme = {};

const createPerformances = async (ctx: Context) => {
  const data = await performanceController.createPerformances(ctx.request.body);
  ctx.status = 201;
  ctx.body = data;
};

createPerformances.validationScheme = {
  body: Joi.object({
    ID: Joi.number().required(),
    month: Joi.number().required(),
    year: Joi.number().required(),
    clanID: Joi.number().required(),
  }),
};

export default (router: Router) => {
  const performanceRouter = new Router({
    prefix: "/performances",
  });

  performanceRouter.get(
    "/",
    validate(getAllPerformances.validationScheme),
    getAllPerformances
  );

  performanceRouter.post(
    "/",
    validate(createPerformances.validationScheme),
    createPerformances
  );

  router
    .use(performanceRouter.routes())
    .use(performanceRouter.allowedMethods());
};
