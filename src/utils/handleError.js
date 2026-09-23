import * as response from "./response.js";

export const handleError = (res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return response.error(res, 400, err.message);
  }
  return response.error(res, 500, err.message);
};