import { CommandBus, CommandHandler } from "@nestjs/cqrs";
import { Command } from "@nestjs-architects/typed-cqrs";
import { IInferredCommandHandler } from "@nestjs/cqrs/dist/command-bus";
import { UserRepository } from "../../user/repositories/user.repository";
import * as bcrypt from 'bcrypt';
import { BadRequestException } from "@nestjs/common";
import { SignInBodyDto } from "../dtos/sign-in-body.dto";
import { UserDoc } from "../../user/models/user.model";
import { GetTokenPairCommand } from "./get-token-pair.command";
import { CreateSessionCommand } from "../../sessions/commands/create-session.command";
import { IRequestWithData } from "../../shared/interfaces/request-with-data";

export class SignInCommand extends Command<{ refreshToken: string, accessToken: string, user: UserDoc }> {
  constructor(
    public readonly signInData: SignInBodyDto,
    public readonly request: IRequestWithData
  ) {
    super();
  }
}

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements IInferredCommandHandler<SignInCommand> {
  private readonly errorMsg: string = 'Email or password is wrong';

  constructor(
    private readonly userRepo: UserRepository,
    private commandBus: CommandBus
  ) {}

  async execute(command: SignInCommand) {
    const { email, password } = command.signInData;
    const { request } = command;

    const user = await this.userRepo.getByEmail(email);

    if (!user)
      throw new BadRequestException(this.errorMsg);

    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException(this.errorMsg);

    const session = await this.commandBus.execute(new CreateSessionCommand(user.id, request.ip, request.hostname));

    const tokens = await this.commandBus.execute(new GetTokenPairCommand(user, session.id));

    return { ...tokens, user: user };
  }
}
