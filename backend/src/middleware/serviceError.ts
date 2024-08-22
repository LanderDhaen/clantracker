const NOT_FOUND = "NOT_FOUND";
const VALIDATION_FAILED = "VALIDATION_FAILED";
const UNAUTHORIZED = "UNAUTHORIZED";
const FORBIDDEN = "FORBIDDEN";
const UPLOAD_TOO_LARGE = "TOO_LARGE";
const UNSUPPORTED_MEDIA = "UNSUPPORTED_MEDIA";

interface ServiceErrorDetails {
  [key: string]: any;
}

class ServiceError extends Error {
  code: string;
  details: ServiceErrorDetails;

  constructor(
    code: string,
    message: string,
    details: ServiceErrorDetails = {}
  ) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = "ServiceError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceError);
    }
  }

  static notFound(
    message: string,
    details?: ServiceErrorDetails
  ): ServiceError {
    return new ServiceError(NOT_FOUND, message, details);
  }

  static validationFailed(
    message: string,
    details?: ServiceErrorDetails
  ): ServiceError {
    return new ServiceError(VALIDATION_FAILED, message, details);
  }

  static unauthorized(
    message: string,
    details?: ServiceErrorDetails
  ): ServiceError {
    return new ServiceError(UNAUTHORIZED, message, details);
  }

  static forbidden(
    message: string,
    details?: ServiceErrorDetails
  ): ServiceError {
    return new ServiceError(FORBIDDEN, message, details);
  }

  static uploadTooLarge(
    message: string,
    details?: ServiceErrorDetails
  ): ServiceError {
    return new ServiceError(UPLOAD_TOO_LARGE, message, details);
  }

  static unsupportedMedia(
    message: string,
    details?: ServiceErrorDetails
  ): ServiceError {
    return new ServiceError(UNSUPPORTED_MEDIA, message, details);
  }

  get isNotFound(): boolean {
    return this.code === NOT_FOUND;
  }

  get isValidationFailed(): boolean {
    return this.code === VALIDATION_FAILED;
  }

  get isUnauthorized(): boolean {
    return this.code === UNAUTHORIZED;
  }

  get isForbidden(): boolean {
    return this.code === FORBIDDEN;
  }

  get isUploadTooLarge(): boolean {
    return this.code === UPLOAD_TOO_LARGE;
  }

  get isUnsupportedMedia(): boolean {
    return this.code === UNSUPPORTED_MEDIA;
  }
}

export default ServiceError;
