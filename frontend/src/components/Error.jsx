import { isAxiosError } from "axios";

export default function Error({ error }) {
  if (isAxiosError(error)) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
        data-cy="axios_error_message"
      >
        <strong className="font-bold">Oops, something went wrong:</strong>
        <span className="block sm:inline">
          {error.response.data?.message || error.message}
          {error.response.data?.details && (
            <>
              :
              <br />
              <span className="block whitespace-pre-wrap">
                {JSON.stringify(error.response.data.details, null, 2)}
              </span>
            </>
          )}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
        data-cy="error_message"
      >
        <strong className="font-bold">An unexpected error occurred:</strong>
        <span className="block sm:inline">
          {error.message || JSON.stringify(error)}
        </span>
      </div>
    );
  }

  return null;
}
