module.exports = {
  database: {
    client: "sqlite3",
    connection: {
      filename: "./../../dev.sqlite3",
    },
    useNullAsDefault: true,
  },
  log: {
    level: "info",
    disabled: false,
  },
  cors: {
    origins: ["https://clantracker-frontend.onrender.com"],
    maxAge: 3 * 60 * 60, // 3 hours in seconds
  },
};
