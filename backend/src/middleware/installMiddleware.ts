import config from "config";
import bodyParser from "koa-bodyparser";
import koaCors from "@koa/cors";
import * as emoji from "node-emoji";
import { getLogger } from "./logging";
import ServiceError from "./serviceError";
import Koa, { Context, Next } from "koa";

const NODE_ENV: string = config.get("env");
const CORS_ORIGINS: string[] = config.get("cors.origins");
const CORS_MAX_AGE: number = config.get("cors.maxAge");

export default function installMiddlewares(app: Koa) {
  app.use(async (ctx: Context, next: Next) => {
    getLogger().info(`${emoji.get("fast_forward")} ${ctx.method} ${ctx.url}`);

    const getStatusEmoji = () => {
      if (ctx.status >= 500) return emoji.get("skull");
      if (ctx.status >= 400) return emoji.get("x");
      if (ctx.status >= 300) return emoji.get("rocket");
      if (ctx.status >= 200) return emoji.get("white_check_mark");
      return emoji.get("rewind");
    };

    try {
      await next();
      getLogger().info(
        `${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`
      );
    } catch (error) {
      getLogger().error(
        `${emoji.get("x")} ${ctx.method} ${ctx.status} ${ctx.url}`,
        {
          error,
        }
      );
      throw error;
    }
  });

  app.use(
    koaCors({
      origin: (ctx: Context) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin || "") !== -1) {
          return ctx.request.header.origin;
        }
        return CORS_ORIGINS[0];
      },
      allowHeaders: ["Accept", "Content-Type", "Authorization"],
      maxAge: CORS_MAX_AGE,
      credentials: true,
    })
  );

  app.use(bodyParser());

  app.use(async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (error) {
      getLogger().error("Error occurred while handling a request", { error });

      let statusCode: number = error.status || 500;
      let errorBody = {
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message,
        details: error.details || {},
        stack: NODE_ENV !== "production" ? error.stack : undefined,
      };

      if (error instanceof ServiceError) {
        if (error.isNotFound) {
          statusCode = 404;
        } else if (error.isValidationFailed) {
          statusCode = 400;
        } else if (error.isUnauthorized) {
          statusCode = 401;
        } else if (error.isForbidden) {
          statusCode = 403;
        }
      }

      ctx.status = statusCode;
      ctx.body = errorBody;
    }
  });

  app.use(async (ctx: Context, next: Next) => {
    await next();

    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = {
        code: "NOT_FOUND",
        message: `Unknown resource: ${ctx.url}`,
      };
    }
  });
}
