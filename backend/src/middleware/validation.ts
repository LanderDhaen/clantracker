import Joi, {
  ValidationError,
  ValidationErrorItem,
  ValidationResult,
} from "joi";
import { Context, Next } from "koa";

interface ValidationSchema {
  params?: Joi.ObjectSchema;
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  fields?: Joi.ObjectSchema;
  files?: Joi.ObjectSchema;
}

const JOI_OPTIONS: Joi.ValidationOptions = {
  abortEarly: true,
  allowUnknown: false,
  convert: true,
  presence: "required",
};

type ValidateMiddleware = (ctx: Context, next: Next) => Promise<void>;

export const validate = (schema: ValidationSchema = {}): ValidateMiddleware => {
  return async (ctx: Context, next: Next) => {
    const errors: Record<string, any> = {};

    if (!Joi.isSchema(schema.params)) {
      schema.params = Joi.object(schema.params || {});
    }

    const { error: paramsError, value: paramsValue }: ValidationResult =
      schema.params.validate(ctx.params, JOI_OPTIONS);

    if (paramsError) {
      errors.params = cleanupJoiError(paramsError);
    } else {
      ctx.params = paramsValue;
    }

    if (!Joi.isSchema(schema.body)) {
      schema.body = Joi.object(schema.body || {});
    }

    const { error: bodyError, value: bodyValue }: ValidationResult =
      schema.body.validate(ctx.request.body, JOI_OPTIONS);

    if (bodyError) {
      errors.body = cleanupJoiError(bodyError);
    } else {
      ctx.request.body = bodyValue;
    }

    if (!Joi.isSchema(schema.query)) {
      schema.query = Joi.object(schema.query || {});
    }

    const { error: queryError, value: queryValue }: ValidationResult =
      schema.query.validate(ctx.query, JOI_OPTIONS);

    if (queryError) {
      errors.query = cleanupJoiError(queryError);
    } else {
      ctx.query = queryValue;
    }

    if (Object.keys(errors).length) {
      ctx.throw(400, "Validation failed, check details for more information", {
        code: "VALIDATION_FAILED",
        details: errors,
      });
    }

    await next();
  };
};

const cleanupJoiError = (error: ValidationError): Record<string, any> => {
  return error.details.reduce(
    (resultObj: Record<string, any>, detail: ValidationErrorItem) => {
      const joinedPath = detail.path.join(".") || "value";

      if (!resultObj[joinedPath]) {
        resultObj[joinedPath] = [];
      }
      resultObj[joinedPath].push({
        type: detail.type,
        message: detail.message,
      });

      return resultObj;
    },
    {}
  );
};
