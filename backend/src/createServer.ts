import config from "config";
import Koa from "koa";
import { initializeLogger, getLogger } from "./middleware/logging";
import installRoutes from "./routes";
import { initializeData, shutdownData } from "./data";
import installMiddleware from "./middleware/installMiddleware";

interface Server {
  getApp: () => Koa;
  start: () => Promise<void>;
  stop: () => Promise<void>;
}

const NODE_ENV: string = config.get("env");
const LOG_LEVEL: string = config.get("log.level");
const LOG_DISABLED: boolean = config.get("log.disabled");

const dbClient: string = config.get("database.client");
console.log("db client " + dbClient);

export default async function createServer(): Promise<Server> {
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: {
      NODE_ENV,
    },
  });

  await initializeData();

  const app = new Koa();

  installMiddleware(app);
  installRoutes(app);

  return {
    getApp() {
      return app;
    },

    start() {
      return new Promise((resolve) => {
        const port: number = config.get("port");
        app.listen(port, () => {
          getLogger().info(`🚀 Server listening on http://localhost:${port}`);
          resolve();
        });
      });
    },

    async stop() {
      app.removeAllListeners();
      await shutdownData();
      getLogger().info("Goodbye! 👋");
    },
  };
}
