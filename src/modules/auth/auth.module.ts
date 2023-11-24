import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { CreateNewProfileCommandHandler } from "./commands/create-new-profile.command";
import { CqrsModule } from "@nestjs/cqrs";
import { UserModule } from "../user/user.module";

export const commandHandlers = [
  CreateNewProfileCommandHandler
];

@Module({
  imports: [
    CqrsModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [
    ...commandHandlers,
  ]
})
export class AuthModule {
}
