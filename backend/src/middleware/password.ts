import config from "config";
import argon2 from "argon2";

const ARGON_SALT_LENGTH = config.get<number>("auth.argon.saltLength");
const ARGON_HASH_LENGTH = config.get<number>("auth.argon.hashLength");
const ARGON_TIME_COST = config.get<number>("auth.argon.timeCost");
const ARGON_MEMORY_COST = config.get<number>("auth.argon.memoryCost");

export const hashPassword = async (password: string) => {
  const hashedPassword = await argon2.hash(password, {
    type: argon2.argon2id,
    salt: ARGON_SALT_LENGTH,
    hashLength: ARGON_HASH_LENGTH,
    timeCost: ARGON_TIME_COST,
    memoryCost: ARGON_MEMORY_COST,
  });

  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const valid = await argon2.verify(hashedPassword, password);

  return valid;
};
