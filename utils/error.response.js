class errorResponse{
    constructor(message, code = 400){
        this.message = message;
        this.statusCode = code;
    }
}

module.exports = errorResponse