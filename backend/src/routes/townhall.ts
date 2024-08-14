import Joi from "joi";
import Router from "@koa/router";
import * as townHallController from "../controllers/townhall";
import { validate } from "../middleware/validation";
import { Context } from "koa";

const getAllTownHalls = async (ctx: Context) => {
  const data = await townHallController.getAllTownHalls();
  ctx.body = data;
};

getAllTownHalls.validationScheme = {};

const getTownhallByID = async (ctx: Context) => {
  const id = Number(ctx.params.id);
  const data = await townHallController.getTownhallByID(id);
  ctx.body = data;
};

getTownhallByID.validationScheme = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const createTownhall = async (ctx: Context) => {
  const data = await townHallController.createTownhall(ctx.request.body);
  ctx.body = data;
};

createTownhall.validationScheme = {
  body: Joi.object({
    name: Joi.string().required(),
    level: Joi.number().required(),
  }),
};

const updateTownhall = async (ctx: Context) => {
  const id = Number(ctx.params.id);
  const data = await townHallController.updateTownhall(id, ctx.request.body);

  ctx.body = data;
};

updateTownhall.validationScheme = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
    level: Joi.number().required(),
  }),
};

export default (router: Router): void => {
  const townHallRouter = new Router({
    prefix: "/townhalls",
  });

  townHallRouter.get(
    "/",
    validate(getAllTownHalls.validationScheme),
    getAllTownHalls
  );

  townHallRouter.get(
    "/:id",
    validate(getTownhallByID.validationScheme),
    getTownhallByID
  );

  townHallRouter.post(
    "/",
    validate(createTownhall.validationScheme),
    createTownhall
  );

  townHallRouter.put(
    "/:id",
    validate(updateTownhall.validationScheme),
    updateTownhall
  );

  router.use(townHallRouter.routes()).use(townHallRouter.allowedMethods());
};
