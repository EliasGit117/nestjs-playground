import { UserDoc } from "../../user/models/user.model";

export class SignResultDto {
  refreshToken: string;
  accessToken: string;
  user: UserDoc;
}
