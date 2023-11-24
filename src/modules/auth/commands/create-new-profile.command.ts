import { CommandHandler } from "@nestjs/cqrs";
import { CreateNewProfileDto } from "../dtos/create-new-profile.dto";
import { Command } from "@nestjs-architects/typed-cqrs";
import { IInferredCommandHandler } from "@nestjs/cqrs/dist/command-bus";
import { UserRepository } from "../../user/user.repository";
import { User } from "../../user/user.model";

export class CreateNewProfileCommand extends Command<User> {
  constructor(public readonly profile: CreateNewProfileDto) {
    super();
  }
}

@CommandHandler(CreateNewProfileCommand)
export class CreateNewProfileCommandHandler implements IInferredCommandHandler<CreateNewProfileCommand> {

  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: CreateNewProfileCommand) {
    const { profile } = command;
    return await this.userRepo.insertOne({ ...profile });
  }
}
