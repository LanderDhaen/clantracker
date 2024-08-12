const knex = require("knex");
const { join } = require("node:path");
const { getLogger } = require("../middleware/logging");
const config = require("config");

const NODE_ENV = config.get("env");
const isDevelopment = NODE_ENV === "development";

const DATABASE_CLIENT = config.get("database.client");
const DATABASE_HOST = config.get("database.host");
const DATABASE_PORT = config.get("database.port");
const DATABASE_NAME = config.get("database.name");
const DATABASE_USERNAME = config.get("database.username");
const DATABASE_PASSWORD = config.get("database.password");

let knexInstance;

async function initializeData() {
  const logger = getLogger();
  logger.info("Initializing connection to the database");

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
    logger.error(error.message, { error });
    throw new Error("Could not initialize the database");
  } finally {
    await tempKnex.destroy();
  }

  logger.info("Connecting to the database");

  const knexOptions = {
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
    logger.error(error.message, { error });
    throw new Error("Could not initialize the data layer");
  }

  try {
    await knexInstance.migrate.latest();
  } catch (error) {
    logger.error(error.message, { error });
    throw new Error("Migration failed, check the logs for more information");
  }

  if (isDevelopment) {
    try {
      // Seed the database

      await knexInstance.seed.run();

      // Reset sequences

      await resetSequence(knexInstance, "townhall");
      await resetSequence(knexInstance, "clan");
      await resetSequence(knexInstance, "account");
      await resetSequence(knexInstance, "clanwarleague");
      await resetSequence(knexInstance, "performance");
    } catch (error) {
      logger.error("Error while seeding database", {
        error,
      });
    }
  }

  logger.info("Database connection successful");

  return knexInstance;
}

function getKnex() {
  if (!knexInstance)
    throw new Error(
      "Please initialize the data layer before getting the Knex instance"
    );
  return knexInstance;
}

async function shutdownData() {
  const logger = getLogger();
  logger.info("Shutting down database connection");

  await knexInstance.destroy();
  knexInstance = null;

  logger.info("Database connection closed");
}

const resetSequence = async (knex, table) => {
  const maxResult = await knex.raw(
    `SELECT MAX("ID") AS sequence_max FROM ${table}`
  );
  const max = maxResult.rows[0].sequence_max || 0;

  console.log("Resetting sequence", table, max);

  const sequenceResult = await knex.raw(
    `SELECT pg_get_serial_sequence('${table}', 'ID') AS sequence_name`
  );
  const sequence = sequenceResult.rows[0].sequence_name;

  await knex.raw(`SELECT setval('${sequence}', ${max})`);
};
const tables = Object.freeze({
  townhall: "townhall",
  clan: "clan",
  account: "account",
  cwl: "clanwarleague",
  performance: "performance",
});

module.exports = {
  tables,
  getKnex,
  initializeData,
  shutdownData,
};
