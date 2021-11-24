import { ErrorObj } from "../types/ErrorObj";

export function generateErrorObj(
  errorCode: number,
  errorMessage: String
): ErrorObj {
  return {
    errorObj: {
      errorCode,
      errorMessage,
    },
  };
}
