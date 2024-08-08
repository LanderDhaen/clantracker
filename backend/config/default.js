module.exports = {
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
      memoryCost: 2 ** 17, // 128 MB
    },
    jwt: {
      secret:
        "eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked",
      expirationInterval: 60 * 60 * 1000, // ms (1 hour)
      refreshInterval: 5 * 1000, // ms (7 days)
      issuer: "clantracker.be",
      audience: "clantracker.be",
    },
    session: {
      key: "clantracker.sid",
      maxAge: 60 * 60 * 24 * 7 * 1000, // ms (1 week)
      overwrite: true,
      httpOnly: true,
      signed: true,
    },
  },
};
