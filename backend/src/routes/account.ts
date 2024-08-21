import Joi from "joi";
import Router from "@koa/router";
import { Context } from "koa";
import * as accountController from "../controllers/account";
import { validate } from "../middleware/validation";
import { InsertableAccount, UpdateableAccount } from "../types/account";

const getAllAccounts = async (ctx: Context) => {
  const data = await accountController.getAllAccounts();
  ctx.body = data;
};

getAllAccounts.validationScheme = {};

const getMainAccounts = async (ctx: Context) => {
  const data = await accountController.getMainAccounts();
  ctx.body = data;
};

getMainAccounts.validationScheme = {};

const getAccountByID = async (ctx: Context) => {
  const id = Number(ctx.params.id);
  const data = await accountController.getAccountByID(id);
  ctx.body = data;
};

getAccountByID.validationScheme = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const getAccountDetailsByID = async (ctx: Context) => {
  const id = Number(ctx.params.id);
  const data = await accountController.getAccountDetailsByID(id);
  ctx.body = data;
};

getAccountDetailsByID.validationScheme = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const createAccount = async (ctx: Context) => {
  const body = ctx.request.body as InsertableAccount;
  await accountController.createAccount(body);
  ctx.status = 201;
};

createAccount.validationScheme = {
  body: Joi.object({
    username: Joi.string().required(),
    name: Joi.string().optional(),
    role: Joi.number().required(),
    nationality: Joi.string().required(),
    joined: Joi.date().required(),
    left: Joi.date().optional().allow(null),
    accountID: Joi.number().optional().allow(null),
    townhallID: Joi.number().required(),
    clanID: Joi.number().required(),
  }),
};

const updateAccount = async (ctx: Context) => {
  const id = Number(ctx.params.id);
  const body = ctx.request.body as UpdateableAccount;
  await accountController.updateAccount(id, body);
  ctx.status = 204;
};

updateAccount.validationScheme = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    username: Joi.string().required(),
    name: Joi.string().optional(),
    role: Joi.number().required(),
    nationality: Joi.string().required(),
    joined: Joi.date().required(),
    left: Joi.date().optional().allow(null),
    accountID: Joi.number().optional().allow(null),
    townhallID: Joi.number().required(),
    clanID: Joi.number().required(),
  }),
};

export default (router: Router) => {
  const accountRouter = new Router({
    prefix: "/accounts",
  });

  accountRouter.get(
    "/",
    validate(getAllAccounts.validationScheme),
    getAllAccounts
  );
  accountRouter.get(
    "/main-accounts",
    validate(getMainAccounts.validationScheme),
    getMainAccounts
  );
  accountRouter.get(
    "/:id",
    validate(getAccountByID.validationScheme),
    getAccountByID
  );
  accountRouter.get(
    "/:id/details",
    validate(getAccountDetailsByID.validationScheme),
    getAccountDetailsByID
  );
  accountRouter.post(
    "/",
    validate(createAccount.validationScheme),
    createAccount
  );
  accountRouter.put(
    "/:id",
    validate(updateAccount.validationScheme),
    updateAccount
  );

  router.use(accountRouter.routes()).use(accountRouter.allowedMethods());
};
