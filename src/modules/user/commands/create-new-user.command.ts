import { CommandHandler } from "@nestjs/cqrs";
import { SignUpBodyDto } from "../../auth/dtos/sign-up-body.dto";
import { Command } from "@nestjs-architects/typed-cqrs";
import { IInferredCommandHandler } from "@nestjs/cqrs/dist/command-bus";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user.model";

export class CreateNewUserCommand extends Command<User> {
  constructor(public readonly profile: SignUpBodyDto) {
    super();
  }
}

@CommandHandler(CreateNewUserCommand)
export class CreateNewUserCommandHandler implements IInferredCommandHandler<CreateNewUserCommand> {

  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: CreateNewUserCommand) {
    const { profile } = command;
    return await this.userRepo.insertOne({ ...profile });
  }
}
