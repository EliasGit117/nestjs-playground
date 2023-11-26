import { IInferredQueryHandler, Query } from "@nestjs-architects/typed-cqrs";
import { QueryHandler } from "@nestjs/cqrs";
import { Session, SessionDoc } from "../models/session.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class GetSessionByIdQuery extends Query<SessionDoc | undefined> {
  constructor(
    public readonly id: string
  ) {
    super();
  }
}

@QueryHandler(GetSessionByIdQuery)
export class GetSessionByIdQueryHandler implements IInferredQueryHandler<GetSessionByIdQuery> {

  constructor(@InjectModel(Session.name) private readonly sessionModel: Model<Session>) {}

  async execute({id}: GetSessionByIdQuery): Promise<SessionDoc | undefined> {
    return this.sessionModel.findById(id);
  }
}
