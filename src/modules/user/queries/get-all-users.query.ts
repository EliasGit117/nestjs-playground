import { QueryHandler } from "@nestjs/cqrs";
import { Query, IInferredQueryHandler } from "@nestjs-architects/typed-cqrs";
import { UserRepository } from "../user.repository";
import { UserDoc } from "../models/user.model";

export class GetAllUsersQuery extends Query<UserDoc[]> {
  constructor() {
    super();
  }
}

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersQueryHandler implements IInferredQueryHandler<GetAllUsersQuery> {

  constructor(private readonly userRepo: UserRepository) {}

  async execute(query: GetAllUsersQuery): Promise<UserDoc[]> {
    return await this.userRepo.getAll();
  }
}
