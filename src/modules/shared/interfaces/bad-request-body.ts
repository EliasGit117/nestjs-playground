import { MessageType } from "../enums/message-type.enum";
import IValidationError from "./validation-error";

export interface IBadRequestBody {
  message: string | IValidationError[],
  messageType?: MessageType,
  error: string,
  statusCode: number
}
