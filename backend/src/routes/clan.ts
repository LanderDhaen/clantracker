import Joi from "joi";
import Router from "@koa/router";
import { Context } from "koa";
import * as clanController from "../controllers/clan";
import { validate } from "../middleware/validation";

const getAllClans = async (ctx: Context): Promise<void> => {
  const data = await clanController.getAllClans();
  ctx.body = data;
};

getAllClans.validationScheme = {};

const getClanDetailsByID = async (ctx: Context): Promise<void> => {
  const id = Number(ctx.params.id);
  const data = await clanController.getClanDetailsByID(id);
  ctx.body = data;
};

getClanDetailsByID.validationScheme = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

export default (router: Router): void => {
  const clanRouter = new Router({
    prefix: "/clans",
  });

  clanRouter.get("/", validate(getAllClans.validationScheme), getAllClans);
  clanRouter.get(
    "/:id",
    validate(getClanDetailsByID.validationScheme),
    getClanDetailsByID
  );

  router.use(clanRouter.routes()).use(clanRouter.allowedMethods());
};
