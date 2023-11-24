import { ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetAllUsersQuery } from "../queries/get-all-users.query";

@ApiTags("user")
@Controller("user")
export class UserController {

  constructor(
    private readonly queryBus: QueryBus
  ) {
  }

  @Get()
  getAll() {
    return this.queryBus.execute(new GetAllUsersQuery());
  }
}
