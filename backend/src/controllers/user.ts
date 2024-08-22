import ServiceError from "../middleware/serviceError";
import * as userService from "../services/user";
import * as sessionService from "../services/session";
import { verifyPassword } from "../middleware/password";
import { randomUUID } from "crypto";

export const login = async (username: string, password: string) => {
  const user = await userService.getUserByUsername(username);

  if (!user) {
    throw ServiceError.unauthorized(
      "This username and password combination is not valid."
    );
  }

  if (!user.isActive) {
    throw ServiceError.unauthorized("This user account is not active.");
  }

  const match = await verifyPassword(password, user.hashedPassword);

  if (!match) {
    throw ServiceError.unauthorized(
      "This username and password combination is not valid."
    );
  }

  const session = await sessionService.createSession({
    sessionID: randomUUID(),
    userID: user.ID,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });

  return session;
};

export const check = async (sessionID: string) => {
  if (!sessionID) {
    throw ServiceError.unauthorized("This session is not valid.");
  }

  const session = await sessionService.getSessionBySessionID(sessionID);

  if (!session) {
    throw ServiceError.unauthorized("This session is not valid.");
  }

  if (session.expiresAt < new Date()) {
    throw ServiceError.unauthorized("This session has expired.");
  }

  return session;
};
