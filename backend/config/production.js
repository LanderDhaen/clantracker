module.exports = {
  log: {
    level: "info",
    disabled: false,
  },
  cors: {
    origins: ["https://clantracker-frontend.onrender.com"],
    maxAge: 3 * 60 * 60, // 3 hours in seconds
  },
};
