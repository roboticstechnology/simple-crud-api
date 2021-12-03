export class CustomException extends Error {

    constructor(name, message, statusCode) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }

}