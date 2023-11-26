import { QueryHandler } from "@nestjs/cqrs";
import { Query, IInferredQueryHandler } from "@nestjs-architects/typed-cqrs";
import { UserRepository } from "../repositories/user.repository";
import { UserDoc } from "../models/user.model";
import { NotFoundException } from "@nestjs/common";

export class GetUserByIdQuery extends Query<UserDoc | undefined> {
  constructor(public readonly userId: string) {
    super();
  }
}

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IInferredQueryHandler<GetUserByIdQuery> {

  constructor(private readonly userRepo: UserRepository) {}

  async execute({ userId }: GetUserByIdQuery): Promise<UserDoc | undefined> {
    if (!userId)
      throw new NotFoundException();

    const user = await this.userRepo.getById(userId)
    if (!user)
      throw new NotFoundException();

    return user;
  }
}
