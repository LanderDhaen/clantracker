import Koa from "koa";
import Router from "@koa/router";
import installHealthRouter from "./health";
import installAccountRouter from "./account";
import installClanRouter from "./clan";
import installTownhallRouter from "./townhall";
import installPerformanceRouter from "./performance";

export default (app: Koa): Koa => {
  const router = new Router({
    prefix: "/api",
  });

  installHealthRouter(router);
  installAccountRouter(router);
  installClanRouter(router);
  installTownhallRouter(router);
  installPerformanceRouter(router);

  app.use(router.routes()).use(router.allowedMethods());

  return app;
};
