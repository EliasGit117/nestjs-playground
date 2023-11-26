import { CommandBus, CommandHandler } from "@nestjs/cqrs";
import { Command } from "@nestjs-architects/typed-cqrs";
import { IInferredCommandHandler } from "@nestjs/cqrs/dist/command-bus";
import { UserRepository } from "../../user/repositories/user.repository";
import { SignUpBodyDto } from "../dtos/sign-up-body.dto";
import { GetTokenPairCommand } from "./get-token-pair.command";
import { UserDoc } from "../../user/models/user.model";
import { IRequestWithData } from "../../shared/interfaces/request-with-data";
import { CreateSessionCommand } from "../../sessions/commands/create-session.command";

export class SignUpCommand extends Command<{ refreshToken: string, accessToken: string, user: UserDoc }> {
  constructor(
    public readonly signUpData: SignUpBodyDto,
    public readonly request: IRequestWithData
  ) {
    super();
  }
}

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements IInferredCommandHandler<SignUpCommand> {

  constructor(
    private readonly userRepo: UserRepository,
    private commandBus: CommandBus
  ) {}

  async execute({ signUpData, request }: SignUpCommand) {

    const user = await this.userRepo.insertOne({ ...signUpData });

    const session = await this.commandBus.execute(new CreateSessionCommand(user.id, request.ip, request.hostname));

    const tokens = await this.commandBus.execute(new GetTokenPairCommand(user, session.id));
    return { ...tokens, user: user };
  }
}
