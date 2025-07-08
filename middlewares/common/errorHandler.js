const createError = require('http-errors');

//Not found
function notFoundErrorHandler(req, res, next) {
    next(createError(404, 'Requested resource was not found.'));
}

//Default handler
function defaultErrorHandler(err, req, res, next) {
    res.locals.error = process.env.NODE_ENV === "development" ? err : {message: err.message};
    const errorCode = err.status || 500;
    res.status(errorCode);

    if(res.locals.html) {
        res.render('error', {
            title: "Error Page",
            code: errorCode,
            error: err.message || "Internal Server Error."
        });
        return;
    }
    res.json(res.locals.error);
}

module.exports = {
    notFoundErrorHandler,
    defaultErrorHandler
};