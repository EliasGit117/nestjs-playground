import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { SignUpBodyDto } from "../dtos/sign-up-body.dto";
import { SignInBodyDto } from "../dtos/sign-in-body.dto";
import { SignInCommand } from "../commands/sign-in.command";
import { AccessTokenGuard } from "../../shared/guards/access-token.guard";
import { GetUserByIdQuery } from "../../user/queries/get-user-by-id.query";
import { SignUpCommand } from "../commands/sign-up.command";
import { UserDoc } from "../../user/models/user.model";
import { SignResultDto } from "../dtos/sign-result.dto";
import { IRequestWithData } from "../../shared/interfaces/request-with-data";
import {
  RefreshAccessTokenCommand,
} from "../commands/refresh-access-token.command";
import { RefreshTokenGuard } from "../../shared/guards/refresh-token.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post("sign-in")
  async signIn(@Req() request: IRequestWithData, @Body() body: SignInBodyDto): Promise<SignResultDto> {
    return this.commandBus.execute(new SignInCommand(body, request));
  }

  @Post("sign-up")
  async signUp(@Req() request: IRequestWithData, @Body() body: SignUpBodyDto): Promise<SignResultDto> {
    return this.commandBus.execute(new SignUpCommand(body, request));
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Req() req: IRequestWithData): Promise<{ accessToken: string, user: UserDoc }> {
    return this.commandBus.execute(new RefreshAccessTokenCommand(req.refreshTokenData?.sub, req.refreshTokenData?.sessionId));
  }

  @Get("who-am-i")
  @UseGuards(AccessTokenGuard)
  async getRole(@Req() req: IRequestWithData): Promise<UserDoc> {
    return this.queryBus.execute(new GetUserByIdQuery(req.accessTokenData?.sub));
  }

}
