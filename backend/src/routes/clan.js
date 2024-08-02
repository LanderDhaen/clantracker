const Joi = require("joi");
const Router = require("@koa/router");
const clanController = require("../controllers/clan");
const { validate } = require("../middleware/validation");

const getAllClans = async (ctx) => {
  const data = await clanController.getAllClans();
  ctx.body = data;
};

getAllClans.validationScheme = {};

module.exports = (app) => {
  const router = new Router({
    prefix: "/clans",
  });

  router.get("/", validate(getAllClans.validationScheme), getAllClans);

  app.use(router.routes()).use(router.allowedMethods());
};
