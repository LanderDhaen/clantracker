import Router from "@koa/router";
import { Context } from "vm";
import { validate } from "../middleware/validation";
import * as cwlController from "../controllers/cwl";
import Joi from "joi";

const getAllCWLs = async (ctx: Context): Promise<void> => {
  const data = await cwlController.getAllCWLs();
  ctx.body = data;
};

getAllCWLs.validationScheme = {};

const getCWLDetailsByID = async (ctx: Context): Promise<void> => {
  const data = await cwlController.getCWLDetailsByID(ctx.params.id);
  ctx.body = data;
};

getCWLDetailsByID.validationScheme = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

export default (router: Router): void => {
  const cwlRouter = new Router({
    prefix: "/cwls",
  });

  cwlRouter.get("/", validate(getAllCWLs.validationScheme), getAllCWLs);
  cwlRouter.get(
    "/:id",
    validate(getCWLDetailsByID.validationScheme),
    getCWLDetailsByID
  );

  router.use(cwlRouter.routes()).use(cwlRouter.allowedMethods());
};
