import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.model";
import { CreateNewUserCommandHandler } from "./commands/create-user.command";
import { UserRepository } from "./user.repository";
import { CqrsModule } from "@nestjs/cqrs";

const injectablesToExport = [
  UserRepository
];

export const commandHandlers = [
  CreateNewUserCommandHandler
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [
  ],
  providers: [
    ...injectablesToExport,
    ...commandHandlers
  ],
  exports: [
    ...injectablesToExport
  ]
})
export class UserModule {}
