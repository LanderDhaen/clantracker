import winston, { Logger } from "winston";
import { format, transports } from "winston";
import config from "config";

const { combine, timestamp, colorize, printf } = format;

let rootLogger: Logger | null;

interface LoggerOptions {
  level: string;
  disabled?: boolean;
  defaultMeta?: Record<string, any>;
}

export const getLogger = (): Logger => {
  if (!rootLogger) {
    throw new Error("You must first initialize the logger");
  }

  return rootLogger;
};

const loggerFormat = () => {
  const formatMessage = ({
    level,
    message,
    timestamp,
    name = "server",
    ...rest
  }: Record<string, any>) =>
    `${timestamp} | ${name} | ${level} | ${message} | ${JSON.stringify(rest)}`;

  const formatError = ({ error: { stack }, ...rest }: Record<string, any>) =>
    `${formatMessage(rest)}\n\n${stack}\n`;

  const formatFn = (info: Record<string, any>) =>
    info.error instanceof Error ? formatError(info) : formatMessage(info);

  return combine(colorize(), timestamp(), printf(formatFn));
};

export const initializeLogger = ({
  level,
  disabled = false,
  defaultMeta = {},
}: LoggerOptions): Logger => {
  rootLogger = winston.createLogger({
    level,
    format: loggerFormat(),
    defaultMeta,
    transports:
      config.get<string>("env") === "test"
        ? [
            new transports.File({
              filename: "test.log",
            }),
          ]
        : [
            new transports.Console({
              silent: disabled,
            }),
          ],
  });

  return rootLogger;
};
