const Joi = require("joi");
const Router = require("@koa/router");
const townHallController = require("../controllers/townhall");
const { validate } = require("../middleware/validation");

const getAllTownHalls = async (ctx) => {
  const data = await townHallController.getAllTownHalls();
  ctx.body = data;
};

getAllTownHalls.validationScheme = {};

module.exports = (app) => {
  const router = new Router({
    prefix: "/townhalls",
  });

  router.get("/", validate(getAllTownHalls.validationScheme), getAllTownHalls);

  app.use(router.routes()).use(router.allowedMethods());
};
