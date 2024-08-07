const knex = require("knex");
const { join } = require("node:path");
const { getLogger } = require("../middleware/logging");
const config = require("config");

const NODE_ENV = config.get("env");
const isDevelopment = NODE_ENV === "development";

const DATABASE_CLIENT = config.get("database.client");
const DATABASE_FILE = config.get("database.connection.filename");

let knexInstance;

async function initializeData() {
  const logger = getLogger();
  logger.info("Initializing connection to the database");

  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      filename: DATABASE_FILE,
    },
    useNullAsDefault: true,
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
      await knexInstance.seed.run();
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
