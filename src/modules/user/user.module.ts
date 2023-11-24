import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./models/user.model";
import { UserRepository } from "./user.repository";
import { CqrsModule } from "@nestjs/cqrs";
import { UserController } from "./controllers/user.controller";
import { GetAllUsersQueryHandler } from "./queries/get-all-users.query";
import { CreateNewUserCommandHandler } from './commands/create-new-user.command';

const injectablesToExport = [
  UserRepository
];

const queryHandlers = [
  GetAllUsersQueryHandler
];

const commandHandlers = [
  CreateNewUserCommandHandler
];

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
