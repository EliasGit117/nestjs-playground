import { HttpException, HttpStatus } from "@nestjs/common";
import { MessageType } from "../enums/message-type.enum";
import { IBadRequestBody } from "../interfaces/bad-request-body";

export class BadRequestException extends HttpException {

  constructor(message: string) {
    const body = {
      message: message,
      messageType: MessageType.TEXT,
      error: "Bad Request",
      statusCode: HttpStatus.BAD_REQUEST
    } satisfies IBadRequestBody;

    super(body, HttpStatus.BAD_REQUEST);
  }
}
