export default {
  log: {
    level: "silly",
    disabled: true,
  },
  cors: {
    origins: ["http://localhost:5173"],
    maxAge: 3 * 60 * 60,
  },
};
