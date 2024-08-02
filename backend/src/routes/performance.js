const Joi = require("joi");
const Router = require("@koa/router");
const performanceController = require("../controllers/performance");
const { validate } = require("../middleware/validation");

const getAllPerformances = async (ctx) => {
  const data = await performanceController.getAllPerformances();
  ctx.body = data;
};

getAllPerformances.validationScheme = {};

module.exports = (app) => {
  const router = new Router({
    prefix: "/performances",
  });

  router.get(
    "/",
    validate(getAllPerformances.validationScheme),
    getAllPerformances
  );

  app.use(router.routes()).use(router.allowedMethods());
};
