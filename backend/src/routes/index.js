const Router = require("@koa/router");
const installHealthRouter = require("./health");
const installAccountRouter = require("./account");
const installClanRouter = require("./clan");
const installTownhallRouter = require("./townhall");
const installPerformanceRouter = require("./performance");

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installHealthRouter(router);
  installAccountRouter(router);
  installClanRouter(router);
  installTownhallRouter(router);
  installPerformanceRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
