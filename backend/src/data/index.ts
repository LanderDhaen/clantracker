import { getLogger } from "../middleware/logging";
import config from "config";
import { PostgresDialect, Kysely, sql } from "kysely";
import { Pool } from "pg";
import { Database } from "../types/database";

const NODE_ENV = config.get<string>("env");
const DATABASE_HOST = config.get<string>("database.host");
const DATABASE_PORT = config.get<number>("database.port");
const DATABASE_NAME = config.get<string>("database.name");
const DATABASE_USERNAME = config.get<string>("database.username");
const DATABASE_PASSWORD = config.get<string>("database.password");

export const dialect = new PostgresDialect({
  pool: new Pool({
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});

export async function initializeData() {
  const logger = getLogger();
  logger.info("Initializing connection to the database");

  try {
    await sql`SELECT 1+1 AS result`.execute(db);
  } catch (error) {
    logger.error((error as Error).message, { error });
    throw new Error("Could not initialize the data layer");
  }

  logger.info("Database connection established");
}

export async function shutdownData(): Promise<void> {
  const logger = getLogger();
  logger.info("Shutting down database connection");

  if (db) {
    await db.destroy();
  }

  logger.info("Database connection closed");
}

export const tables = Object.freeze({
  townhall: "townhall",
  clan: "clan",
  account: "account",
  cwl: "cwl",
  performance: "performance",
  user: "user",
  session: "session",
});
