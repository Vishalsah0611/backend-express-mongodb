import * as response from "../utils/response.js";

const validate = (schema, source = "body") => (req, res, next) => {
  const data = source === "params" ? req.params : req.body;
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return response.error(res, 400, "Validation failed", errors);
  }

  if (source === "params") {
    req.params = result.data;
  } else {
    req.body = result.data;
  }

  next();
};

export default validate;