const Joi = require("joi");
const Router = require("@koa/router");
const accountController = require("../controllers/account");
const { validate } = require("../middleware/validation");

const getAllAccounts = async (ctx) => {
  const data = await accountController.getAllAccounts();
  ctx.body = data;
};

getAllAccounts.validationScheme = {};

module.exports = (app) => {
  const router = new Router({
    prefix: "/accounts",
  });

  router.get("/", validate(getAllAccounts.validationScheme), getAllAccounts);

  app.use(router.routes()).use(router.allowedMethods());
};
