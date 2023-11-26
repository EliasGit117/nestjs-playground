import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./models/user.model";
import { UserRepository } from "./repositories/user.repository";
import { CqrsModule } from "@nestjs/cqrs";
import { UserController } from "./controllers/user.controller";
import { GetAllUsersQueryHandler } from "./queries/get-all-users.query";
import { CreateNewUserCommandHandler } from './commands/create-new-user.command';
import { GetUserByIdQueryHandler } from "./queries/get-user-by-id.query";

const injectablesToExport = [UserRepository];
const queryHandlers = [GetAllUsersQueryHandler, GetUserByIdQueryHandler];
const commandHandlers = [CreateNewUserCommandHandler];
const toProvideAndExport = [
  ...injectablesToExport,
  ...commandHandlers,
  ...queryHandlers
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [
    UserController
  ],
  providers: [...toProvideAndExport],
  exports: [...toProvideAndExport]
})
export class UserModule {}
