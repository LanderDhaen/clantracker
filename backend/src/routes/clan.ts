import Joi from "joi";
import Router from "@koa/router";
import { Context } from "koa";
import clanController from "../controllers/clan";
import { validate } from "../middleware/validation";

const getAllClans = async (ctx: Context): Promise<void> => {
  const data = await clanController.getAllClans();
  ctx.body = data;
};

getAllClans.validationScheme = null;

const getClanByID = async (ctx: Context): Promise<void> => {
  const id = Number(ctx.params.id);
  const data = await clanController.getClanByID(id);
  ctx.body = data;
};

getClanByID.validationScheme = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

export default (router: Router): void => {
  const clanRouter = new Router({
    prefix: "/clans",
  });

  clanRouter.get("/", validate(getAllClans.validationScheme), getAllClans);
  clanRouter.get("/:id", validate(getClanByID.validationScheme), getClanByID);

  router.use(clanRouter.routes()).use(clanRouter.allowedMethods());
};
