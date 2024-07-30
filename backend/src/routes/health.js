const Router = require("@koa/router");
const healthController = require("../controllers/health");
const { validate } = require("../middleware/validation");

const ping = async (ctx) => {
  ctx.status = 200;
  ctx.body = healthController.ping();
};

ping.validationScheme = null;

const getVersion = async (ctx) => {
  ctx.status = 200;
  ctx.body = healthController.getVersion();
};

getVersion.validationScheme = null;

module.exports = function installHealthRoutes(app) {
  const router = new Router({
    prefix: "/health",
  });

  router.get("/ping", validate(ping.validationScheme), ping);
  router.get("/version", validate(getVersion.validationScheme), getVersion);

  app.use(router.routes()).use(router.allowedMethods());
};
