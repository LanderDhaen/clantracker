const Router = require("@koa/router");
const installHealthRouter = require("./health");
const installAccountRouter = require("./account");

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installHealthRouter(router);
  installAccountRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
