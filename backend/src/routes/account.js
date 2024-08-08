const Joi = require("joi");
const Router = require("@koa/router");
const accountController = require("../controllers/account");
const { validate } = require("../middleware/validation");

const getAllAccounts = async (ctx) => {
  const data = await accountController.getAllAccounts();
  ctx.body = data;
};

getAllAccounts.validationScheme = {};

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
  const data = await accountController.createAccount(ctx.request.body);
  ctx.body = data;
};

createAccount.validationScheme = {
  body: Joi.object({
    username: Joi.string().required(),
    name: Joi.string().optional(),
    role: Joi.number().required(),
    joined: Joi.date().required(),
    left: Joi.date().optional(),
    accountID: Joi.number().optional(),
    townhallID: Joi.number().required(),
    clanID: Joi.number().required(),
  }),
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/accounts",
  });

  router.get("/", validate(getAllAccounts.validationScheme), getAllAccounts);
  router.get("/:id", validate(getAccountByID.validationScheme), getAccountByID);
  router.post("/", validate(createAccount.validationScheme), createAccount);

  app.use(router.routes()).use(router.allowedMethods());
};
