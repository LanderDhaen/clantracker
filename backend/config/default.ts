export default {
  port: 9000,
  log: {
    level: "silly",
    disabled: false,
  },
  cors: {
    origins: ["http://localhost:5173"],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: "pg",
  },
  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    session: {
      key: "clantracker.sid",
      maxAge: 60 * 60 * 24 * 7 * 1000,
      overwrite: true,
      httpOnly: true,
      signed: true,
    },
  },
};
