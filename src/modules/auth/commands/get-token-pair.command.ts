import { Command } from "@nestjs-architects/typed-cqrs";
import { CommandHandler } from "@nestjs/cqrs";
import { IInferredCommandHandler } from "@nestjs/cqrs/dist/command-bus";
import { JwtService } from "@nestjs/jwt";
import { UserDoc } from "../../user/models/user.model";
import { accessTokenOptions, refreshTokenOptions } from "../constants/token-options";

export class GetTokenPairCommand extends Command<{ refreshToken: string, accessToken: string }> {
  constructor(
    public readonly user: UserDoc,
    public readonly sessionId: string
  ) {
    super();
  }
}

@CommandHandler(GetTokenPairCommand)
export class GetTokenPairCommandHandler implements IInferredCommandHandler<GetTokenPairCommand> {

  constructor(
    private jwtService: JwtService
  ) {}

  async execute({ user, sessionId }: GetTokenPairCommand) {

    const refreshToken = await this.jwtService.signAsync({ sub: user.id, sessionId: sessionId }, refreshTokenOptions);
    const accessToken = await this.jwtService.signAsync({ sub: user.id, role: user.role }, accessTokenOptions);

    return { refreshToken: refreshToken, accessToken: accessToken };
  }
}
