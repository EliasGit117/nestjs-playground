import { CommandHandler } from "@nestjs/cqrs";
import { CreateNewProfileDto } from "../../auth/dtos/create-new-profile.dto";
import { Command } from "@nestjs-architects/typed-cqrs";
import { IInferredCommandHandler } from "@nestjs/cqrs/dist/command-bus";
import { UserRepository } from "../user.repository";
import { User } from "../models/user.model";

export class CreateNewUserCommand extends Command<User> {
  constructor(public readonly profile: CreateNewProfileDto) {
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
