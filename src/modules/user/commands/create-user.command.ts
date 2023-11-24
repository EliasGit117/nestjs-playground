import { CommandHandler } from "@nestjs/cqrs";
import { Command } from "@nestjs-architects/typed-cqrs";
import { IInferredCommandHandler } from "@nestjs/cqrs/dist/command-bus";
import { CreateNewProfileDto } from "../../auth/dtos/create-new-profile.dto";

export class CreateNewProfileCommand extends Command<string>{
  constructor(public readonly profile: CreateNewProfileDto) {
    super();
  }
}

@CommandHandler(CreateNewProfileCommand)
export class CreateNewUserCommandHandler implements IInferredCommandHandler<CreateNewProfileCommand> {

  async execute(command: CreateNewProfileCommand) {
    console.warn('WORKS')

    return 'Ha';
  }
}
