const logger = (req, res, next) => {
  console.log("Incoming request:", req.method, req.path);
  next();
};

export default logger;