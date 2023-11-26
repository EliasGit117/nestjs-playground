import { Command } from "@nestjs-architects/typed-cqrs";
import { UserDoc } from "../../user/models/user.model";
import { CommandHandler, QueryBus } from "@nestjs/cqrs";
import { IInferredCommandHandler } from "@nestjs/cqrs/dist/command-bus";
import { UserRepository } from "../../user/repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException } from "../../shared/exceptions/form-validation.exception";
import { accessTokenOptions } from "../constants/token-options";
import { GetSessionByIdQuery } from "../../sessions/queries/get-session-by-id.query";
import { UnauthorizedException } from "@nestjs/common";

export class RefreshAccessTokenCommand extends Command<{ accessToken: string, user: UserDoc }> {
  constructor(
    public readonly userId: string,
    public readonly sessionId: string,
  ) {
    super();
  }
}

@CommandHandler(RefreshAccessTokenCommand)
export class GetNewAccessTokenCommandHandler implements IInferredCommandHandler<RefreshAccessTokenCommand> {

  constructor(
    private readonly userRepo: UserRepository,
    private readonly queryBus: QueryBus,
    private jwtService: JwtService
  ) {
  }

  async execute({ userId, sessionId }: RefreshAccessTokenCommand) {
    const user = await this.userRepo.getById(userId);

    if (!user)
      throw new BadRequestException("User has not been found");

    const session = await this.queryBus.execute(new GetSessionByIdQuery(sessionId));

    if (!session)
      throw new UnauthorizedException('Refresh token is not available anymore');

    const accessToken = await this.jwtService.signAsync(
      { sub: user._id, role: user.role },
      accessTokenOptions
    );

    return { accessToken: accessToken, user: user };
  }
}
