const Joi = require("joi");
const Router = require("@koa/router");
const clanController = require("../controllers/clan");
const { validate } = require("../middleware/validation");

const getAllClans = async (ctx) => {
  const data = await clanController.getAllClans();
  ctx.body = data;
};

getAllClans.validationScheme = {};

const getClanByID = async (ctx) => {
  const data = await clanController.getClanByID(ctx.params.id);
  ctx.body = data;
};

getClanByID.validationScheme = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/clans",
  });

  router.get("/", validate(getAllClans.validationScheme), getAllClans);
  router.get("/:id", validate(getClanByID.validationScheme), getClanByID);

  app.use(router.routes()).use(router.allowedMethods());
};
