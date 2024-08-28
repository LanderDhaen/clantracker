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

const getCWLByID = async (ctx: Context) => {
  const data = await cwlController.getCWLByID(ctx.params.id);
  ctx.body = data;
};

getCWLByID.validationScheme = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const getCWLDetailsByID = async (ctx: Context) => {
  const data = await cwlController.getCWLDetailsByID(ctx.params.id);
  ctx.body = data;
};

getCWLDetailsByID.validationScheme = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const createCWL = async (ctx: Context) => {
  const data = await cwlController.createCWL(ctx.request.body);

  ctx.body = data;
};

createCWL.validationScheme = {
  body: Joi.object({
    month: Joi.number().required(),
    year: Joi.number().required(),
    league: Joi.number().required(),
    placementType: Joi.number().required(),
    size: Joi.number().required(),
    clanID: Joi.number().required(),
  }),
};

export default (router: Router) => {
  const cwlRouter = new Router({
    prefix: "/cwls",
  });

  cwlRouter.get("/", validate(getAllCWLs.validationScheme), getAllCWLs);
  cwlRouter.get("/:id", validate(getCWLByID.validationScheme), getCWLByID);
  cwlRouter.get(
    "/:id/details",
    validate(getCWLDetailsByID.validationScheme),
    getCWLDetailsByID
  );
  cwlRouter.post("/", validate(createCWL.validationScheme), createCWL);

  router.use(cwlRouter.routes()).use(cwlRouter.allowedMethods());
};
