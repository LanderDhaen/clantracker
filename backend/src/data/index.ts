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
  logger.info("Initializing connection to the database for migrations & seeds");

  logger.info("Checking if the PostgreSQL database exists");

  const tempKnex = knex({
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: "postgres",
    },
  });

  try {
    const databaseExists = await tempKnex.raw(
      `SELECT 1 FROM pg_database WHERE datname = '${DATABASE_NAME}'`
    );

    if (databaseExists.rows.length === 0) {
      logger.info("Database does not exist, creating it");
      await tempKnex.raw(`CREATE DATABASE ${DATABASE_NAME}`);
    } else {
      logger.info("Database exists");
    }
  } catch (error) {
    logger.error((error as Error).message, { error });
    throw new Error("Could not initialize the database");
  } finally {
    await tempKnex.destroy();
  }

  logger.info("Connecting to the database");

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

  try {
    await knexInstance.migrate.latest();
  } catch (error) {
    logger.error((error as Error).message, { error });
    throw new Error("Migration failed, check the logs for more information");
  }

  if (isDevelopment) {
    try {
      await knexInstance.seed.run();

      await resetSequence(knexInstance, "townhall");
      await resetSequence(knexInstance, "clan");
      await resetSequence(knexInstance, "account");
      await resetSequence(knexInstance, "clanwarleague");
      await resetSequence(knexInstance, "performance");
    } catch (error) {
      logger.error("Error while seeding database", { error });
    }
  }

  logger.info("Database connection successful");
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

const resetSequence = async (knex: Knex, table: string): Promise<void> => {
  const maxResult = await knex.raw(
    `SELECT MAX("ID") AS sequence_max FROM ${table}`
  );
  const max = maxResult.rows[0]?.sequence_max || 0;

  console.log("Resetting sequence", table, max);

  const sequenceResult = await knex.raw(
    `SELECT pg_get_serial_sequence('${table}', 'ID') AS sequence_name`
  );
  const sequence = sequenceResult.rows[0]?.sequence_name;

  if (sequence) {
    await knex.raw(`SELECT setval('${sequence}', ${max})`);
  }
};

const dialect = new PostgresDialect({
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
