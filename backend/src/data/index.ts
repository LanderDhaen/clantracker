import knex, { Knex } from "knex";
import { join } from "node:path";
import { getLogger } from "../middleware/logging";
import config from "config";
import { PostgresDialect, Kysely } from "kysely";
import { Pool } from "pg";

const NODE_ENV = config.get<string>("env");
const isDevelopment = NODE_ENV === "development";

const DATABASE_CLIENT = config.get<string>("database.client");
const DATABASE_HOST = config.get<string>("database.host");
const DATABASE_PORT = config.get<number>("database.port");
const DATABASE_NAME = config.get<string>("database.name");
const DATABASE_USERNAME = config.get<string>("database.username");
const DATABASE_PASSWORD = config.get<string>("database.password");

let knexInstance: Knex | null = null;

export async function initializeData() {
  const logger = getLogger();
  logger.info("Initializing connection to the database");

  const knexOptions: Knex.Config = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
    },
    debug: isDevelopment,
    migrations: {
      tableName: "knex_meta",
      directory: join("src", "data", "migrations"),
    },
    seeds: {
      directory: join("src", "data", "seeds"),
    },
  };

  knexInstance = knex(knexOptions);

  try {
    await knexInstance.raw("SELECT 1+1 AS result");
  } catch (error) {
    logger.error((error as Error).message, { error });
    throw new Error("Could not initialize the data layer");
  }

  logger.info("Database connection established");
}

export async function shutdownData(): Promise<void> {
  const logger = getLogger();
  logger.info("Shutting down database connection");

  if (knexInstance) {
    await knexInstance.destroy();
    knexInstance = null;
  }

  logger.info("Database connection closed");
}

export function getKnex(): Knex {
  if (!knexInstance) {
    throw new Error(
      "Please initialize the data layer before getting the Knex instance"
    );
  }
  return knexInstance;
}

export const dialect = new PostgresDialect({
  pool: new Pool({
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  }),
});

export const db = new Kysely({
  dialect,
});

export const tables = Object.freeze({
  townhall: "townhall",
  clan: "clan",
  account: "account",
  cwl: "clanwarleague",
  performance: "performance",
});
