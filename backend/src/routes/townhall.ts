import Joi from "joi";
import Router from "@koa/router";
import townHallController from "../controllers/townhall";
import { validate } from "../middleware/validation";
import { Context } from "koa";

const getAllTownHalls = async (ctx: Context) => {
  const data = await townHallController.getAllTownHalls();
  ctx.body = data;
};

getAllTownHalls.validationScheme = {};

export default (router: Router): void => {
  const townHallRouter = new Router({
    prefix: "/townhalls",
  });

  townHallRouter.get(
    "/",
    validate(getAllTownHalls.validationScheme),
    getAllTownHalls
  );

  router.use(townHallRouter.routes()).use(townHallRouter.allowedMethods());
};
