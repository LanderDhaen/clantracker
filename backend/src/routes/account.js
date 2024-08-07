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

module.exports = (app) => {
  const router = new Router({
    prefix: "/accounts",
  });

  router.get("/", validate(getAllAccounts.validationScheme), getAllAccounts);
  router.get("/:id", validate(getAccountByID.validationScheme), getAccountByID);

  app.use(router.routes()).use(router.allowedMethods());
};
