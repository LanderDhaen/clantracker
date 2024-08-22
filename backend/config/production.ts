export default {
  log: {
    level: "info",
    disabled: false,
  },
  cors: {
    origins: ["https://clantracker-frontend.onrender.com"],
    maxAge: 3 * 60 * 60,
  },
};
