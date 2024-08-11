const Joi = require("joi");
const Router = require("@koa/router");
const accountController = require("../controllers/account");
const { validate } = require("../middleware/validation");

const getAllAccounts = async (ctx) => {
  const data = await accountController.getAllAccounts();
  ctx.body = data;
};

getAllAccounts.validationScheme = {};

const getMainAccounts = async (ctx) => {
  const data = await accountController.getMainAccounts();
  ctx.body = data;
};

getMainAccounts.validationScheme = {};

const getAccountByID = async (ctx) => {
  const data = await accountController.getAccountByID(ctx.params.id);
  ctx.body = data;
};

getAccountByID.validationScheme = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const createAccount = async (ctx) => {
  await accountController.createAccount({
    ...ctx.request.body,
    username: ctx.request.body.username,
    name: ctx.request.body.name,
    role: ctx.request.body.role,
    nationality: ctx.request.body.nationality,
    joined: ctx.request.body.joined,
    left: ctx.request.body.left,
    accountID: ctx.request.body.accountID,
    townhallID: ctx.request.body.townhallID,
    clanID: ctx.request.body.clanID,
  });

  ctx.status = 201;
};

createAccount.validationScheme = {
  body: Joi.object({
    username: Joi.string().required(),
    name: Joi.string().optional(),
    role: Joi.number().required(),
    nationality: Joi.string().required(),
    joined: Joi.date().required(),
    left: Joi.date().optional(),
    accountID: Joi.number().optional(),
    townhallID: Joi.number().required(),
    clanID: Joi.number().required(),
  }),
};

const updateAccount = async (ctx) => {
  await accountController.updateAccount(ctx.params.id, ctx.request.body);
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

module.exports = (app) => {
  const router = new Router({
    prefix: "/accounts",
  });

  router.get("/", validate(getAllAccounts.validationScheme), getAllAccounts);
  router.get(
    "/main-accounts",
    validate(getMainAccounts.validationScheme),
    getMainAccounts
  );
  router.get("/:id", validate(getAccountByID.validationScheme), getAccountByID);
  router.post("/", validate(createAccount.validationScheme), createAccount);
  router.put("/:id", validate(updateAccount.validationScheme), updateAccount);

  app.use(router.routes()).use(router.allowedMethods());
};
