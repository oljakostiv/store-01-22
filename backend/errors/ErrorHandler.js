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

    static unauthorized(message) {
        return new ErrorHandler(401, 'User is unauthorized')
    };

    static forbidden(message) {
        return new ErrorHandler(403, 'Forbidden!')
    };

    static serverErr(message) {
        return new ErrorHandler(500, message)
    }
}

module.exports = ErrorHandler;
