import { Command } from "@nestjs-architects/typed-cqrs";
import { CommandHandler } from "@nestjs/cqrs";
import { IInferredCommandHandler } from "@nestjs/cqrs/dist/command-bus";
import { Session, SessionDoc } from "../models/session.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

export class CreateSessionCommand extends Command<SessionDoc> {
  constructor(
    public readonly userId: string,
    public readonly ip: string,
    public readonly userAgent: string
  ) {
    super();
  }
}

@CommandHandler(CreateSessionCommand)
export class CreateSessionCommandHandler implements IInferredCommandHandler<CreateSessionCommand> {

  constructor(
    @InjectModel(Session.name) private readonly sessionModel: Model<Session>
  ) {
  }

  async execute({ userId, userAgent, ip }: CreateSessionCommand) {
    return await new this.sessionModel({
      userId: new Types.ObjectId(userId),
      userAgent: userAgent,
      ip: ip
    }).save();
  }
}
