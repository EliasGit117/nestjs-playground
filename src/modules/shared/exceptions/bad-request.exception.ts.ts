import { HttpException, HttpStatus } from "@nestjs/common";
import IValidationError from "../interfaces/validation-error";
import { MessageType } from "../enums/message-type.enum";
import { IBadRequestBody } from "../interfaces/bad-request-body";

export class FormValidationException extends HttpException {

  constructor(message: IValidationError[]) {
    const body = {
      message: message,
      messageType: MessageType.FORM_ERROR,
      error: "Bad Request",
      statusCode: HttpStatus.BAD_REQUEST
    } satisfies IBadRequestBody;

    super(body, HttpStatus.BAD_REQUEST);
  }
}
