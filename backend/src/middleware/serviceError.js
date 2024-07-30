const NOT_FOUND = "NOT_FOUND";
const VALIDATION_FAILED = "VALIDATION_FAILED";
const UNAUTHORIZED = "UNAUTHORIZED";
const FORBIDDEN = "FORBIDDEN";
const UPLOAD_TOO_LARGE = "TOO_LARGE";
const UNSUPPORTED_MEDIA = "UNSUPPORTED_MEDIA";

class ServiceError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = "ServiceError";
  }

  static notFound(message, details) {
    return new ServiceError(NOT_FOUND, message, details);
  }

  static validationFailed(message, details) {
    return new ServiceError(VALIDATION_FAILED, message, details);
  }

  static unauthorized(message, details) {
    return new ServiceError(UNAUTHORIZED, message, details);
  }

  static forbidden(message, details) {
    return new ServiceError(FORBIDDEN, message, details);
  }

  static uploadTooLarge(message, details) {
    return new ServiceError(UPLOAD_TOO_LARGE, message, details);
  }

  static unsupportedMedia(message, details) {
    return new ServiceError(UNSUPPORTED_MEDIA, message, details);
  }

  get isNotFound() {
    return this.code === NOT_FOUND;
  }

  get isValidationFailed() {
    return this.code === VALIDATION_FAILED;
  }

  get isUnauthorized() {
    return this.code === UNAUTHORIZED;
  }

  get isForbidden() {
    return this.code === FORBIDDEN;
  }

  get isUploadTooLarge() {
    return this.code === UPLOAD_TOO_LARGE;
  }

  get isUnsupportedMedia() {
    return this.code === UNSUPPORTED_MEDIA;
  }
}

module.exports = ServiceError;
