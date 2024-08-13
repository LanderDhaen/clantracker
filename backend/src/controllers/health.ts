import { version as _version, name as _name } from "../../package.json";

const ping = () => ({ pong: true });

const getVersion = () => ({
  env: process.env.NODE_ENV,
  version: _version,
  name: _name,
});

export default {
  ping,
  getVersion,
};
