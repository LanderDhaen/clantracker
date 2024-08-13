import { defineConfig } from "kysely-ctl";
import { dialect } from "./src/data/index";

export default defineConfig({
  dialect: dialect,
  migrations: {
    migrationFolder: "src/data/migrations",
  },
  seeds: {
    seedFolder: "src/data/seeds",
  },
});
