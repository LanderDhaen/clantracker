import Router from "@koa/router";
import { Context } from "vm";
import { validate } from "../middleware/validation";
import * as cwlController from "../controllers/cwl";

const getAllCWLs = async (ctx: Context): Promise<void> => {
  const data = await cwlController.getAllCWLs();
  ctx.body = data;
};

getAllCWLs.validationScheme = {};

export default (router: Router): void => {
  const cwlRouter = new Router({
    prefix: "/cwls",
  });

  cwlRouter.get("/", validate(getAllCWLs.validationScheme), getAllCWLs);

  router.use(cwlRouter.routes()).use(cwlRouter.allowedMethods());
};
