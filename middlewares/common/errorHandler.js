const createError = require("http-errors");

// 404 not found handler
function notFoundErrorHandler(req, res, next) {
  next(createError(404, "Your requested content was not found!"));
}

// default error handler
function defaultErrorHandler(err, req, res, next) {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };
  const code = err.status || 500;
  res.status(code);

  if (res.locals.html) {
    // html response
    res.render("error", {
      title: "Error page",
      code: code,
      error: err.message,
    });
  } else {
    // json response
    res.json(res.locals.error);
  }
}

module.exports = {
  notFoundErrorHandler,
  defaultErrorHandler,
};
