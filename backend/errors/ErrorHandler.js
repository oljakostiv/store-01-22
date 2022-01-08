// class ErrorHandler extends Error {
//     constructor(status, message) {
//         super(message);
//         this.status = status;
//
//         Error.captureStackTrace(this, this.constructor);
//     }
// }

class ErrorHandler extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message) {
        return new ErrorHandler(400, message)
    };

    static forbidden(message) {
        return new ErrorHandler(403, message)
    };

    static serverErr(message) {
        return new ErrorHandler(500, message)
    }
}

module.exports = ErrorHandler;
