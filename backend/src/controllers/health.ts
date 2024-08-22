import { version as _version, name as _name } from "../../package.json";

export const ping = () => ({ pong: true });

export const getVersion = () => ({
  env: process.env.NODE_ENV,
  version: _version,
  name: _name,
});
